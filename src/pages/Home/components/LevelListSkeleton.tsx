import { Skeleton, Stack } from "@/components";

import styles from "./LevelListSkeleton.module.css";

export const LevelListSkeleton = ({ count = 5 }: { count?: number }) => (
  <Stack gap={10} role="status" aria-label="레벨 목록 불러오는 중">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className={styles.item}>
        <Stack direction="horizontal" justify="space-between" align="center">
          <Stack gap="var(--spacing-2)">
            <Skeleton width={48} height={22} />
            <Skeleton width={120} height={16} />
          </Stack>
          <Skeleton width={48} height={14} />
        </Stack>
        <Skeleton height={8} radius="full" />
      </div>
    ))}
  </Stack>
);
