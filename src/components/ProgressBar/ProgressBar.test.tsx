import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("현재 값과 최대값, 백분율을 aria 속성으로 제공한다", () => {
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    render(<ProgressBar value={25} max={50} aria-label="단어 진도" />);

    const progressbar = screen.getByRole("progressbar", { name: "단어 진도" });
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "50");
    expect(progressbar).toHaveAttribute("aria-valuenow", "25");
    expect(progressbar).toHaveAttribute("aria-valuetext", "50%");
    expect(screen.getByText("25 / 50")).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it("범위를 벗어난 값을 clamp하고 label을 숨길 수 있다", () => {
    render(<ProgressBar value={70} max={50} showLabel={false} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuetext", "100%");
    expect(screen.queryByText("70 / 50")).not.toBeInTheDocument();
  });

  it("max가 0 이하면 안전한 최대값 1을 사용한다", () => {
    render(<ProgressBar value={0} max={0} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "1");
  });
});
