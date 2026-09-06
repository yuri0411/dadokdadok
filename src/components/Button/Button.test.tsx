import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("variant, color, size를 data attribute로 적용한다", () => {
    render(
      <Button variant="outlined" color="secondary" size="lg">
        저장
      </Button>
    );

    expect(screen.getByRole("button", { name: "저장" })).toMatchObject({
      dataset: { variant: "outlined", color: "secondary", size: "lg" },
    });
  });

  it("disabled 상태에서는 클릭과 keyboard interaction이 동작하지 않는다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        저장
      </Button>
    );
    const button = screen.getByRole("button", { name: "저장" });

    expect(button).toBeDisabled();
    await user.click(button);
    button.focus();
    await user.keyboard("{Enter} ");

    expect(onClick).not.toHaveBeenCalled();
  });

  it("keyboard로 focus하고 Enter를 누르면 실행된다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>저장</Button>);

    await user.tab();
    expect(screen.getByRole("button", { name: "저장" })).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("loading 상태에서는 aria-busy와 disabled를 적용하고 아이콘을 숨긴다", () => {
    render(
      <Button startIcon={<svg data-testid="start-icon" />} loading loadingText="저장 중">
        저장
      </Button>
    );

    const button = screen.getByRole("button", { name: "저장 중" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByTestId("start-icon")).not.toBeInTheDocument();
  });

  it("loading이 아니면 aria-busy를 만들지 않는다", () => {
    render(<Button>저장</Button>);
    expect(screen.getByRole("button", { name: "저장" })).not.toHaveAttribute("aria-busy");
  });
});
