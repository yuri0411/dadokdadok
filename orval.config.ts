import { defineConfig } from "orval";

const openApiSchema =
  process.env.OPENAPI_SCHEMA ?? "https://jlpt-voca-server.vercel.app/api/docs-json";

export default defineConfig({
  dadokdadokApi: {
    input: {
      target: openApiSchema,
    },
    output: {
      target: "./src/services/generated/api.ts",
      schemas: "./src/services/generated/model",
      client: "react-query",
      httpClient: "axios",
      clean: true,
      formatter: "prettier",
      override: {
        mutator: {
          path: "./src/lib/orvalApi.ts",
          name: "orvalApi",
        },
        query: {
          signal: true,
        },
      },
    },
  },
});
