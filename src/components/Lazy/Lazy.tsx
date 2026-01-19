import { type ReactNode, Suspense } from "react";
import { Stack } from "@/components";

export const Lazy = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <Stack
        align="center"
        justify="center"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        Loading...
      </Stack>
    }
  >
    {children}
  </Suspense>
);
