import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "src/services/generated", "storybook-static"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: [
                "./src/components",
                "./src/pages",
                "./src/layouts",
                "./src/hooks",
                "./src/store",
                "./src/utils",
              ],
              from: ["./src/lib/api.ts", "./src/lib/orvalApi.ts", "./src/services/generated"],
              message:
                "API 접근은 services/<domain>/api.ts 또는 queries.ts를 사용하세요. 생성 코드와 HTTP 클라이언트는 서비스 내부에서만 사용합니다.",
            },
            {
              target: "./src/components",
              from: "./src/pages",
              message:
                "공통 컴포넌트는 페이지에 의존할 수 없습니다. 공통 UI는 components로 옮기세요.",
            },
          ],
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],

          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
            },
          ],

          pathGroupsExcludedImportTypes: ["react"],

          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ["src/{components,pages,layouts,hooks,store,utils}/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["axios", "axios/*"], message: "HTTP 호출은 services 계층으로 옮기세요." },
          ],
        },
      ],
      "no-restricted-globals": [
        "error",
        { name: "fetch", message: "HTTP 호출은 services 계층의 공통 API 클라이언트를 사용하세요." },
        {
          name: "XMLHttpRequest",
          message: "HTTP 호출은 services 계층의 공통 API 클라이언트를 사용하세요.",
        },
      ],
      "no-restricted-properties": [
        "error",
        ...["window", "globalThis", "self"].flatMap((object) =>
          ["fetch", "XMLHttpRequest"].map((property) => ({
            object,
            property,
            message: "HTTP 호출은 services 계층으로 옮기세요.",
          }))
        ),
      ],
    },
  },
]);
