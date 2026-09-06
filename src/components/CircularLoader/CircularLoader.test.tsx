import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CircularLoader } from "./CircularLoader";

describe("CircularLoader", () => {
  it("기본 status와 접근성 이름을 제공한다", () => {
    render(<CircularLoader />);
    expect(screen.getByRole("status", { name: "로딩 중" })).toBeInTheDocument();
  });

  it("size와 strokeWidth를 SVG에 적용한다", () => {
    render(<CircularLoader size="lg" strokeWidth={6} aria-label="단어 불러오는 중" />);

    const status = screen.getByRole("status", { name: "단어 불러오는 중" });
    expect(status).toHaveStyle({ width: "50px", height: "50px" });
    expect(status.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(status.querySelector("circle")).toHaveAttribute("stroke-width", "6");
  });
});
