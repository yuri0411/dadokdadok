import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Typography } from "./Typography";

describe("Typography", () => {
  it("시맨틱 태그와 variant class를 독립적으로 적용한다", () => {
    render(
      <Typography as="h2" variant="h4">
        학습 현황
      </Typography>
    );

    const heading = screen.getByRole("heading", { level: 2, name: "학습 현황" });
    expect(heading).toHaveClass("typography-h4");
  });

  it("정렬과 HTML 속성을 전달한다", () => {
    render(
      <Typography align="center" aria-label="설명">
        본문
      </Typography>
    );
    expect(screen.getByLabelText("설명")).toHaveStyle({ textAlign: "center" });
  });
});
