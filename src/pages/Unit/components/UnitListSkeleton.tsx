import { Skeleton, Stack } from "@/components";

import styles from "./UnitListSkeleton.module.css";

export const UnitListSkeleton = ({ count = 6 }: { count?: number }) => (
  <Stack
    direction="horizontal"
    gap={12}
    wrap="wrap"
    role="status"
    aria-label="단원 목록 불러오는 중"
  >
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className={styles.card}>
        <Stack justify="space-between" style={{ height: 140, padding: "12px 16px" }}>
          <Stack direction="horizontal" justify="space-between">
            <Skeleton width={72} height={20} />
            <Skeleton width={16} height={16} />
          </Stack>
          <Skeleton width={64} height={16} />
        </Stack>
      </div>
    ))}
  </Stack>
);
