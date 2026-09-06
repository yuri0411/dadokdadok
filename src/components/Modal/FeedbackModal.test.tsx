import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FeedbackModal } from "./FeedbackModal";

describe("FeedbackModal", () => {
  beforeEach(() => {
    const portalRoot = document.createElement("div");
    portalRoot.id = "content-root";
    document.body.append(portalRoot);
  });

  it("status와 live region 속성을 제공한다", () => {
    render(
      <FeedbackModal open title="완료">
        저장되었습니다
      </FeedbackModal>
    );

    const status = screen.getByRole("status", { name: "완료" });
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("지정한 시간이 지나면 닫기 콜백을 호출한다", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(
      <FeedbackModal open durationMs={1000} onClose={onClose}>
        완료
      </FeedbackModal>
    );

    act(() => vi.advanceTimersByTime(1000));
    expect(onClose).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it("배경 클릭은 닫고 본문 클릭은 닫지 않는다", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <FeedbackModal open onClose={onClose}>
        완료 내용
      </FeedbackModal>
    );

    await user.click(screen.getByText("완료 내용"));
    expect(onClose).not.toHaveBeenCalled();
    await user.click(document.querySelector("#content-root > div")!);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
