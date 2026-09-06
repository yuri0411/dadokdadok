import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ErrorFallback } from "./ErrorFallback";

describe("ErrorFallback", () => {
  it("오류 내용을 alert로 전달한다", () => {
    render(<ErrorFallback title="단어 오류" description="다시 불러와 주세요" />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("단어 오류");
    expect(alert).toHaveTextContent("다시 불러와 주세요");
  });

  it("재시도 버튼을 keyboard로 실행할 수 있다", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorFallback onRetry={onRetry} />);

    await user.tab();
    expect(screen.getByRole("button", { name: "다시 시도" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("재시도 handler가 없으면 버튼을 렌더링하지 않는다", () => {
    render(<ErrorFallback />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
