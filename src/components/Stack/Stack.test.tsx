import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Stack } from "./Stack";

describe("Stack", () => {
  it("시맨틱 태그와 레이아웃 props를 적용한다", () => {
    render(
      <Stack
        as="section"
        aria-label="학습 정보"
        direction="horizontal"
        justify="space-between"
        align="center"
        gap="8px"
      >
        내용
      </Stack>
    );

    expect(screen.getByRole("region", { name: "학습 정보" })).toHaveStyle({
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "8px",
    });
  });

  it("inline이면 inline-flex를 사용한다", () => {
    render(
      <Stack inline data-testid="stack">
        내용
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveStyle({ display: "inline-flex" });
  });
});
