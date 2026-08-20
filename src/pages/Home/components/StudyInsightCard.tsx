import { HiSparkles } from "react-icons/hi2";

import { ProgressBar, Stack, Typography } from "@/components";
import { useStudyInsightQuery } from "@/services/studyInsight/queries.ts";
import type { TodayStudyContext } from "@/services/studyInsight/types.ts";

import styles from "./StudyInsightCard.module.css";

interface StudyInsightCardProps {
  context?: TodayStudyContext;
}

export const StudyInsightCard = ({ context }: StudyInsightCardProps) => {
  const { data: insight, isPending, isError } = useStudyInsightQuery(context);

  const gradientDefinition = (
    <svg className={styles.gradientDefinition} aria-hidden="true">
      <defs>
        <linearGradient id="study-insight-icon-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop className={styles.primaryStop} offset="0%" />
          <stop className={styles.secondaryStop} offset="100%" />
        </linearGradient>
      </defs>
    </svg>
  );

  const insightHeader = (
    <div className={styles.header}>
      {gradientDefinition}
      <HiSparkles className={styles.sparkles} aria-hidden="true" />
      <Typography as="p" variant="h6" color="inherit">
        AI 학습 분석
      </Typography>
    </div>
  );

  if (!context) {
    return (
      <Stack className={styles.card} gap={8}>
        {insightHeader}
        <Typography as="h2" variant="h5">
          아직 학습 기록이 없어요.
        </Typography>
        <Typography as="p" variant="body" color="tertiary">
          오늘 첫 Unit을 시작하고 나만의 학습 분석을 받아보세요.
        </Typography>
      </Stack>
    );
  }

  const studiedWordCount = context.learnedWordCount + context.repeatWordCount;

  if (isPending) {
    return (
      <Stack
        className={styles.card}
        gap={12}
        role="status"
        aria-label="AI가 학습 기록을 분석하고 있어요"
      >
        {gradientDefinition}
        <div className={styles.loadingVisual} aria-hidden="true">
          <span className={styles.loadingRing} />
          <span className={styles.loadingIcon}>
            <HiSparkles />
          </span>
        </div>
      </Stack>
    );
  }

  if (isError || !insight) {
    return (
      <div className={styles.card} role="status">
        <Typography as="p" variant="body" color="tertiary">
          학습 상태를 분석하지 못했어요. 잠시 후 다시 확인해 주세요.
        </Typography>
      </div>
    );
  }

  return (
    <Stack className={styles.card} gap={12} aria-live="polite">
      {insightHeader}
      <Stack gap={4}>
        <Typography as="p" variant="overline" color="default">
          N{context.level} Unit {context.unit}
        </Typography>
        <Typography as="h2" variant="h5">
          {insight.summary}
        </Typography>
      </Stack>
      <ProgressBar
        value={studiedWordCount}
        max={context.targetWordCount}
        color="strong"
        aria-label={`N${context.level} Unit ${context.unit} 학습 진행률`}
      />
      <Typography as="p" variant="body" color="default">
        {insight.nextAction}
      </Typography>
    </Stack>
  );
};
