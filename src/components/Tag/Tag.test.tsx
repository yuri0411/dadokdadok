import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Tag } from "./Tag";

describe("Tag", () => {
  it("label과 color, size 상태를 적용한다", () => {
    render(<Tag label="진행 중" color="primary" size="md" />);
    const tag = screen.getByText("진행 중");

    expect(tag).toHaveAttribute("data-color", "primary");
    expect(tag).toHaveAttribute("data-size", "md");
  });

  it("전달한 HTML 속성을 유지한다", () => {
    render(<Tag label="2 회독" aria-label="복습 횟수 2회" />);
    expect(screen.getByLabelText("복습 횟수 2회")).toHaveTextContent("2 회독");
  });
});
