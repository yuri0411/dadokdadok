import { beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  localStorage.clear();
  vi.resetModules();
});

describe("학습 기록", () => {
  it("다른 레벨의 마지막 학습 단원을 보존한다", async () => {
    const { useStudyStore: store } = await import("./useStudyStore");
    store.getState().setLastStudy("N5", "1");
    store.getState().setLastStudy("N4", "2");
    store.getState().setLastStudy("N5", "3");
    expect(store.getState().lastStudy).toEqual({ N5: "3", N4: "2" });
  });

  it("회독 수를 레벨과 단원별로 독립적으로 누적한다", async () => {
    const { useStudyStore: store } = await import("./useStudyStore");
    store.getState().setReviewCount("N5", "1");
    store.getState().setReviewCount("N5", "1");
    store.getState().setReviewCount("N5", "2");
    store.getState().setReviewCount("N4", "1");
    expect(store.getState().reviewCountMap).toEqual({ N5: { 1: 2, 2: 1 }, N4: { 1: 1 } });
  });

  it("새 인스턴스에서 기록을 복원하고 초기화 결과도 저장한다", async () => {
    const { useStudyStore: store } = await import("./useStudyStore");
    store.getState().setLastStudy("N5", "2");
    store.getState().setReviewCount("N5", "2");
    vi.resetModules();
    const { useStudyStore: restored } = await import("./useStudyStore");
    expect(restored.getState().lastStudy).toEqual({ N5: "2" });
    expect(restored.getState().latestStudy).toEqual({ level: "N5", unit: "2" });
    expect(restored.getState().reviewCountMap).toEqual({ N5: { 2: 1 } });
    restored.getState().resetStudyInfo();
    vi.resetModules();
    const { useStudyStore: cleared } = await import("./useStudyStore");
    expect(cleared.getState().lastStudy).toEqual({});
    expect(cleared.getState().latestStudy).toBeNull();
    expect(cleared.getState().reviewCountMap).toEqual({});
  });
});

describe("단어 학습 진행", () => {
  it("처음 학습하는 단원은 빈 단어 목록을 반환한다", async () => {
    const { useWordProgressStore: store } = await import("./useWordProgressStore");
    expect(store.getState().getWordProgressByUnit("N5", "1")).toEqual({
      repeatWords: [],
      learnedWords: [],
    });
  });

  it("단원 초기화는 다른 단원과 레벨의 진행을 보존한다", async () => {
    const { useWordProgressStore: store } = await import("./useWordProgressStore");
    for (const [level, unit] of [
      ["N5", "1"],
      ["N5", "2"],
      ["N4", "1"],
    ]) {
      store.getState().setWordProgress({ level, unit, repeatWordIds: [1], learnedWordIds: [2, 3] });
    }
    store.getState().setWordProgressReset("N5", "1");
    expect(store.getState().getWordProgressByUnit("N5", "1")).toEqual({
      repeatWords: [],
      learnedWords: [],
    });
    expect(store.getState().getWordProgressByUnit("N5", "2")).toEqual({
      repeatWords: [1],
      learnedWords: [2, 3],
    });
    expect(store.getState().getLearnedWordsByLevel()).toEqual({ N5: 2, N4: 2 });
  });

  it("진행을 복원하고 전체 초기화도 유지한다", async () => {
    const { useWordProgressStore: store } = await import("./useWordProgressStore");
    store
      .getState()
      .setWordProgress({ level: "N5", unit: "1", repeatWordIds: [1], learnedWordIds: [2] });
    vi.resetModules();
    const { useWordProgressStore: restored } = await import("./useWordProgressStore");
    expect(restored.getState().getWordProgressByUnit("N5", "1")).toEqual({
      repeatWords: [1],
      learnedWords: [2],
    });
    restored.getState().resetWordProgress();
    vi.resetModules();
    const { useWordProgressStore: cleared } = await import("./useWordProgressStore");
    expect(cleared.getState().wordProgressMap).toEqual({});
    expect(cleared.getState().getLearnedWordsByLevel()).toEqual({});
  });
});

describe("학습 시간", () => {
  it("레벨별 시간과 전체 시간을 누적하고 복원한다", async () => {
    const { useTimerStore: store } = await import("./useTimerStore");
    store.getState().setSeconds({ level: "N5", seconds: 30 });
    store.getState().setSeconds({ level: "N4", seconds: 10 });
    store.getState().setSeconds({ level: "N5", seconds: 20 });
    vi.resetModules();
    const { useTimerStore: restored } = await import("./useTimerStore");
    expect(restored.getState().totalSeconds).toBe(60);
    expect(restored.getState().totalSecondsByLevel).toEqual({ N5: 50, N4: 10 });
  });
});

describe("복습 단어", () => {
  it("레벨별로 추가·해제하며 중복 없이 저장하고 복원한다", async () => {
    const { useWordReviewStore: store } = await import("./useWordReviewStore");
    store.getState().toggleReviewWord("N5", 1);
    store.getState().toggleReviewWord("N4", 2);
    store.getState().toggleReviewWord("N5", 1);
    expect(store.getState().isReviewWord("N5", 1)).toBe(false);
    expect(store.getState().isReviewWord("N4", 2)).toBe(true);
    store.getState().toggleReviewWord("N5", 1);
    vi.resetModules();
    const { useWordReviewStore: restored } = await import("./useWordReviewStore");
    expect(restored.getState().getReviewWordCount()).toBe(2);
    expect(restored.getState().getReviewWordIds()).toEqual([1, 2]);
  });

  it("이전 북마크 데이터를 복습 데이터로 이관한다", async () => {
    localStorage.setItem(
      "wordBookmark",
      JSON.stringify({ state: { bookmarkedIds: { N5: [7] } }, version: 0 })
    );
    const { useWordReviewStore: store } = await import("./useWordReviewStore");
    expect(store.getState().reviewWordIds).toEqual({ N5: [7] });
    expect(localStorage.getItem("wordBookmark")).toBeNull();
    vi.resetModules();
    const { useWordReviewStore: restored } = await import("./useWordReviewStore");
    expect(restored.getState().isReviewWord("N5", 7)).toBe(true);
  });

  it("현재 데이터가 있으면 이전 북마크보다 우선한다", async () => {
    localStorage.setItem(
      "wordReview",
      JSON.stringify({ state: { reviewWordIds: { N4: [2] } }, version: 1 })
    );
    localStorage.setItem(
      "wordBookmark",
      JSON.stringify({ state: { bookmarkedIds: { N5: [7] } }, version: 0 })
    );
    const { useWordReviewStore: store } = await import("./useWordReviewStore");
    expect(store.getState().reviewWordIds).toEqual({ N4: [2] });
  });
});
