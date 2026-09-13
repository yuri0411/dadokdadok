import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import HomePage from "@/pages/Home";
import { createStudyInsight } from "@/services/studyInsight/api";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useStudyStore } from "@/store/useStudyStore";
import { useTimerStore } from "@/store/useTimerStore";
import { useWordProgressStore } from "@/store/useWordProgressStore";

import WordPage from "./index";

const { words } = vi.hoisted(() => ({
  words: [1, 2, 3].map((id) => ({
    id,
    word: `단어${id}`,
    meaning: "word",
    meaning_ko: `뜻${id}`,
    furigana: "かな",
    romaji: "kana",
    level: "5",
  })),
}));
vi.mock("@/services/word/api.ts", () => ({
  getWordsPerUnit: vi.fn(async () => ({ items: words })),
  getRandomWords: vi.fn(async (ids: number[]) => words.filter((word) => ids.includes(word.id))),
  getExampleSentence: vi.fn(),
}));
vi.mock("@/services/home/api.ts", () => ({ getTotalByLevel: vi.fn(async () => ({ levels: [] })) }));
vi.mock("@/services/studyInsight/api", () => ({
  createStudyInsight: vi.fn(async () => ({
    summary: "분석 결과",
    nextAction: "계속 학습하세요",
    status: "in_progress",
    progressRate: 0,
  })),
}));

function mount(home = false) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  const router = createMemoryRouter(
    [
      { path: "/", element: <HomePage /> },
      { path: "/word/:unit", element: <WordPage /> },
    ],
    {
      initialEntries: ["/", { pathname: "/word/1", state: { level: "5" } }],
      initialIndex: home ? 0 : 1,
    }
  );
  const view = render(
    <StrictMode>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
  return { ...view, router };
}

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  useStudyStore.setState(useStudyStore.getInitialState(), true);
  useWordProgressStore.setState(useWordProgressStore.getInitialState(), true);
  useTimerStore.setState(useTimerStore.getInitialState(), true);
  useSettingsStore.getState().setWordsPerUnit(10);
  const portal = document.createElement("div");
  portal.id = "content-root";
  document.body.append(portal);
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("학습 페이지 흐름", () => {
  it("답변을 즉시 저장하고 새로 진입하면 다음 단어부터 이어간다", async () => {
    const user = userEvent.setup();
    const view = mount();
    await screen.findByText("단어1");
    await user.click(screen.getByRole("button", { name: "외웠어요" }));
    expect(useWordProgressStore.getState().getWordProgressByUnit("5", "1").learnedWords).toEqual([
      1,
    ]);
    expect(
      JSON.parse(localStorage.getItem("word-progress-storage")!).state.wordProgressMap[5][1]
        .learnedWords
    ).toEqual([1]);
    const saved = localStorage.getItem("word-progress-storage")!;
    view.unmount();
    useWordProgressStore.setState({ wordProgressMap: {} });
    localStorage.setItem("word-progress-storage", saved);
    await useWordProgressStore.persist.rehydrate();
    mount();
    await screen.findByText("단어2");
    expect(screen.queryByText("단어1")).not.toBeInTheDocument();
  });

  it("마지막 단어를 다시 보기로 남기면 회독 완료로 처리하지 않는다", async () => {
    const user = userEvent.setup();
    mount();
    await screen.findByText("단어1");
    await user.click(screen.getByRole("button", { name: "외웠어요" }));
    await user.click(screen.getByRole("button", { name: "외웠어요" }));
    await user.click(screen.getByRole("button", { name: "다시볼래요" }));
    expect(
      screen.getByRole("dialog", { name: "다시 볼 단어들을 무작위 순서로 모아봤어요." })
    ).toBeInTheDocument();
    expect(useStudyStore.getState().reviewCountMap[5]?.[1] ?? 0).toBe(0);
    await user.click(screen.getByRole("button", { name: "복습 시작" }));
    await screen.findByText("단어3");
    await user.click(screen.getByRole("button", { name: "외웠어요" }));
    expect(screen.getByRole("dialog", { name: "학습을 모두 마쳤어요!" })).toBeInTheDocument();
    expect(useStudyStore.getState().reviewCountMap[5][1]).toBe(1);
  });

  it("다시 볼 단어가 하나 남아 있으면 마지막 다른 단어를 외워도 복습한다", async () => {
    const user = userEvent.setup();
    mount();
    await screen.findByText("단어1");
    await user.click(screen.getByRole("button", { name: "다시볼래요" }));
    await user.click(screen.getByRole("button", { name: "외웠어요" }));
    await user.click(screen.getByRole("button", { name: "외웠어요" }));
    expect(screen.getByRole("button", { name: "복습 시작" })).toBeInTheDocument();
  });

  it("학습 시간을 매초 저장하고 뒤로가기나 재진입 때 중복 누적하지 않는다", async () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
    const view = mount();
    await screen.findByText("단어1");
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(useTimerStore.getState().totalSeconds).toBe(3);
    await act(async () => {
      await view.router.navigate(-1);
    });
    expect(useTimerStore.getState().totalSeconds).toBe(3);
    expect(JSON.parse(localStorage.getItem("time-storage")!).state.totalSeconds).toBe(3);
  });

  it("홈 이어하기와 AI 분석은 숫자 키 순서가 아닌 최근 학습 레벨을 사용한다", async () => {
    useStudyStore.getState().setLastStudy("4", "2");
    useStudyStore.getState().setLastStudy("5", "1");
    const { router } = mount(true);
    const user = userEvent.setup();
    expect(screen.getByRole("button", { name: /학습 이어하기 N5 Unit 1/ })).toBeInTheDocument();
    await waitFor(() =>
      expect(createStudyInsight).toHaveBeenCalledWith(
        expect.objectContaining({ level: 5, unit: 1 })
      )
    );
    await user.click(screen.getByRole("button", { name: /학습 이어하기/ }));
    expect(router.state.location.state).toEqual({ level: "5" });
  });
  it("복습 도중 저장해도 현재 목록이 바뀌어 다음 단어를 건너뛰지 않는다", async () => {
    useWordProgressStore
      .getState()
      .setWordProgress({ level: "5", unit: "1", repeatWordIds: [1, 2, 3], learnedWordIds: [] });
    const user = userEvent.setup();
    mount();
    await screen.findByText("단어1");
    await user.click(screen.getByRole("button", { name: "외웠어요" }));
    expect(screen.getByText("단어2")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "외웠어요" }));
    expect(screen.getByText("단어3")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "외웠어요" }));
    expect(useStudyStore.getState().reviewCountMap[5][1]).toBe(1);
    await user.click(screen.getByRole("button", { name: "한번 더 보기" }));
    expect(screen.getByText("단어1")).toBeInTheDocument();
    expect(useWordProgressStore.getState().getWordProgressByUnit("5", "1")).toEqual({
      repeatWords: [],
      learnedWords: [],
    });
  });

  it("단원 이동 시 이전 단원의 로컬 진행과 시간을 재사용하지 않는다", async () => {
    const user = userEvent.setup();
    const { router } = mount();
    await screen.findByText("단어1");
    await user.click(screen.getByRole("button", { name: "외웠어요" }));
    await act(async () => {
      await router.navigate("/word/2", { state: { level: "5" } });
    });
    await screen.findByText("단어1");
    expect(useWordProgressStore.getState().getWordProgressByUnit("5", "1").learnedWords).toEqual([
      1,
    ]);
    expect(useWordProgressStore.getState().getWordProgressByUnit("5", "2").learnedWords).toEqual(
      []
    );
  });

  it("이전 단일 레벨 기록은 이어가되 순서를 모르는 다중 레벨 기록은 추측하지 않는다", async () => {
    useStudyStore.setState({ lastStudy: { 5: "2" }, latestStudy: null });
    const view = mount(true);
    expect(screen.getByRole("button", { name: /학습 이어하기 N5 Unit 2/ })).toBeInTheDocument();
    view.unmount();
    useStudyStore.setState({ lastStudy: { 4: "1", 5: "2" }, latestStudy: null });
    mount(true);
    expect(screen.queryByRole("button", { name: /학습 이어하기/ })).not.toBeInTheDocument();
  });
});
