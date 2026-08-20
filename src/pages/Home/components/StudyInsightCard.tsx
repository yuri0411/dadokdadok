import { ProgressBar, Skeleton, Stack, Typography } from "@/components";
import { useStudyInsightQuery } from "@/services/studyInsight/queries.ts";
import type { TodayStudyContext } from "@/services/studyInsight/types.ts";

import styles from "./StudyInsightCard.module.css";

interface StudyInsightCardProps {
  context: TodayStudyContext;
}

export const StudyInsightCard = ({ context }: StudyInsightCardProps) => {
  const { data: insight, isPending, isError } = useStudyInsightQuery(context);
  const studiedWordCount = context.learnedWordCount + context.repeatWordCount;

  if (isPending) {
    return (
      <Stack className={styles.card} gap={12} role="status" aria-label="학습 상태 분석 중">
        <Skeleton width="45%" height={20} />
        <Skeleton height={16} />
        <Skeleton width="72%" height={16} />
      </Stack>
    );
  }

  if (isError || !insight) {
    return (
      <div className={styles.card} role="status">
        <Typography as="p" variant="body" color="secondary">
          학습 상태를 분석하지 못했어요. 잠시 후 다시 확인해 주세요.
        </Typography>
      </div>
    );
  }

  return (
    <Stack className={styles.card} gap={12} aria-live="polite">
      <Stack gap={4}>
        <Typography as="p" variant="overline" color="secondary">
          AI 학습 분석 · N{context.level} Unit {context.unit}
        </Typography>
        <Typography as="h2" variant="h5">
          {insight.summary}
        </Typography>
      </Stack>
      <ProgressBar
        value={studiedWordCount}
        max={context.targetWordCount}
        aria-label={`N${context.level} Unit ${context.unit} 학습 진행률`}
      />
      <Typography as="p" variant="body" color="secondary">
        {insight.nextAction}
      </Typography>
    </Stack>
  );
};
