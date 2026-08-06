import { Skeleton, Stack } from "@/components";

import styles from "./WordCardSkeleton.module.css";

export const WordCardSkeleton = () => (
  <div className={styles.wordCard} role="status" aria-label="단어 불러오는 중">
    <div className={styles.content}>
      <Stack align="center" gap="var(--spacing-2)">
        <Skeleton width={48} height={14} />
      </Stack>
      <Stack gap={16} align="center" className={styles.word}>
        <Skeleton width={96} height={24} />
        <Skeleton width={160} height={40} />
        <Skeleton width={120} height={24} />
      </Stack>
      <Stack gap={8} direction="horizontal" justify="center" className={styles.toggleButton}>
        <Skeleton width={100} height={36} radius="full" />
        <Skeleton width={100} height={36} radius="full" />
      </Stack>
    </div>
    <Stack direction="horizontal" align="center" className={styles.action}>
      <Skeleton height={84} radius="sm" />
      <Skeleton height={84} radius="sm" />
    </Stack>
  </div>
);
