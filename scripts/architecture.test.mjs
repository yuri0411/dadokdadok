import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";

const eslint = new ESLint();
const boundaryRule = "import/no-restricted-paths";

async function rules(code, filePath = "src/pages/Home/HarnessProbe.tsx") {
  const [result] = await eslint.lintText(code, { filePath });
  return result.messages.map((message) => message.ruleId);
}

describe("아키텍처 규칙", () => {
  it.each(["@/lib/api", "../../lib/api", "@/lib/orvalApi", "@/services/generated/api"])(
    "UI에서 내부 API 접근을 차단한다: %s",
    async (source) => {
      expect(await rules(`import * as internal from '${source}'; void internal;`)).toContain(
        boundaryRule
      );
    }
  );

  it("공통 컴포넌트의 페이지 의존을 차단한다", async () => {
    expect(
      await rules("import Home from '@/pages/Home'; void Home;", "src/components/HarnessProbe.tsx")
    ).toContain(boundaryRule);
  });

  it.each([
    ["import axios from 'axios'; void axios;", "no-restricted-imports"],
    ["fetch('/words');", "no-restricted-globals"],
    ["new XMLHttpRequest();", "no-restricted-globals"],
    ["window.fetch('/words');", "no-restricted-properties"],
    ["globalThis.fetch('/words');", "no-restricted-properties"],
  ])("UI의 직접 HTTP 호출을 차단한다: %s", async (code, rule) => {
    expect(await rules(code)).toContain(rule);
  });

  it("UI의 도메인 API 사용을 허용한다", async () => {
    expect(await rules("import * as words from '@/services/word/api'; void words;")).not.toContain(
      boundaryRule
    );
  });

  it("서비스의 생성 API 사용을 허용한다", async () => {
    expect(
      await rules(
        "import * as api from '@/services/generated/api'; void api;",
        "src/services/word/HarnessProbe.ts"
      )
    ).not.toContain(boundaryRule);
  });
});
