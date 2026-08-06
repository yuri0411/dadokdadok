import { type ReactNode, Suspense } from "react";

import { CircularLoader } from "@/components/CircularLoader/CircularLoader";
import { Stack } from "@/components/Stack/Stack";

export const Lazy = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <Stack
        align="center"
        justify="center"
        style={{
          width: "100%",
          height: "100%",
          minHeight: 240,
        }}
      >
        <CircularLoader aria-label="페이지 불러오는 중" />
      </Stack>
    }
  >
    {children}
  </Suspense>
);
