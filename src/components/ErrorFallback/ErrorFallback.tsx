import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";
import { Typography } from "@/components/Typography/Typography";

import styles from "./ErrorFallback.module.css";

export type ErrorFallbackProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export const ErrorFallback = ({
  title = "불러오지 못했어요",
  description = "잠시 후 다시 시도해 주세요.",
  onRetry,
  retryLabel = "다시 시도",
}: ErrorFallbackProps) => (
  <Stack align="center" justify="center" gap="var(--spacing-4)" className={styles.root} role="alert">
    <Stack align="center" gap="var(--spacing-2)">
      <Typography as="h3" variant="h5" align="center">
        {title}
      </Typography>
      <Typography as="p" variant="body" color="tertiary" align="center">
        {description}
      </Typography>
    </Stack>
    {onRetry && (
      <Button variant="outlined" color="tertiary" onClick={onRetry}>
        {retryLabel}
      </Button>
    )}
  </Stack>
);
