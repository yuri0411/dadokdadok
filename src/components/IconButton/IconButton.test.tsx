import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("variant와 상태를 적용하고 접근 가능한 이름을 제공한다", () => {
    render(
      <IconButton aria-label="북마크" variant="ghost" color="primary" size="lg" active>
        ★
      </IconButton>
    );

    const button = screen.getByRole("button", { name: "북마크" });
    expect(button).toHaveAttribute("data-variant", "ghost");
    expect(button).toHaveAttribute("data-color", "primary");
    expect(button).toHaveAttribute("data-size", "lg");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("keyboard로 실행할 수 있다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton aria-label="설정" onClick={onClick}>
        ⚙
      </IconButton>
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "설정" })).toHaveFocus();
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("disabled 상태에서는 동작하지 않는다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton aria-label="설정" disabled onClick={onClick}>
        ⚙
      </IconButton>
    );

    await user.click(screen.getByRole("button", { name: "설정" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
