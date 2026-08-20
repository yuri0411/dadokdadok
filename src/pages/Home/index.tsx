import { useCallback, useMemo, useState } from "react";

import { isEmpty } from "lodash-es";
import { AiOutlinePushpin } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { ErrorFallback, IconButton, Stack, Typography } from "@/components";
import LevelListItem from "@/pages/Home/components/LevelListItem.tsx";
import { LevelListSkeleton } from "@/pages/Home/components/LevelListSkeleton.tsx";
import { SettingsModal } from "@/pages/Home/components/SettingsModal.tsx";
import { StudyInsightCard } from "@/pages/Home/components/StudyInsightCard.tsx";
import { PATHS } from "@/routes/paths.ts";
import { useTotalByLevelQuery } from "@/services/home/queries.ts";
import type { TodayStudyContext } from "@/services/studyInsight/types.ts";
import { useSettingsStore } from "@/store/useSettingsStore.ts";
import { useStudyStore } from "@/store/useStudyStore.ts";
import { useTimerStore } from "@/store/useTimerStore.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";
import { useWordReviewStore } from "@/store/useWordReviewStore.ts";
import { formatTime } from "@/utils";

import styles from "./index.module.css";

const LEVELS = [5, 4, 3, 2, 1];

const HomePage = () => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const wordsPerUnit = useSettingsStore((state) => state.wordsPerUnit);
  const { totalSeconds, totalSecondsByLevel } = useTimerStore(
    useShallow((state) => ({
      totalSeconds: state.totalSeconds,
      totalSecondsByLevel: state.totalSecondsByLevel,
    }))
  );

  const { getLearnedWordsByLevel, wordProgressMap } = useWordProgressStore(
    useShallow((state) => ({
      getLearnedWordsByLevel: state.getLearnedWordsByLevel,
      wordProgressMap: state.wordProgressMap,
    }))
  );
  const { lastStudy, reviewCountMap } = useStudyStore(
    useShallow((state) => ({
      lastStudy: state.lastStudy,
      reviewCountMap: state.reviewCountMap,
    }))
  );
  const reviewWordCount = useWordReviewStore((state) =>
    Object.values(state.reviewWordIds).reduce((total, ids) => total + ids.length, 0)
  );

  const [level, unit] = Object.entries(lastStudy ?? {})[0] ?? [];

  const studyContext = useMemo<TodayStudyContext | undefined>(() => {
    if (!level || !unit) return undefined;

    const progress = wordProgressMap[level]?.[unit];

    return {
      level: Number(level),
      unit: Number(unit),
      targetWordCount: wordsPerUnit,
      learnedWordCount: progress?.learnedWords.length ?? 0,
      repeatWordCount: progress?.repeatWords.length ?? 0,
      reviewCount: reviewCountMap[level]?.[unit] ?? 0,
      totalStudySeconds: totalSecondsByLevel[level] ?? 0,
    };
  }, [level, reviewCountMap, totalSecondsByLevel, unit, wordProgressMap, wordsPerUnit]);

  const { data: totalByLevel = {}, isPending, isError, refetch } = useTotalByLevelQuery();

  const handleLevelNavigate = useCallback(
    (level: number) => navigate(`${PATHS.UNIT}/${level}`),
    [navigate]
  );

  const renderLevelList = () => {
    if (isPending) return <LevelListSkeleton />;
    if (isError) {
      return (
        <ErrorFallback
          title="레벨 정보를 불러오지 못했어요"
          description="네트워크 상태를 확인한 뒤 다시 시도해 주세요."
          onRetry={() => {
            void refetch();
          }}
        />
      );
    }

    return LEVELS.map((level) => (
      <LevelListItem
        key={level}
        current={getLearnedWordsByLevel()[level] ?? 0}
        total={totalByLevel[level] ?? 0}
        learningTime={totalSecondsByLevel?.[level] ?? 0}
        level={level}
        onClick={handleLevelNavigate}
      />
    ));
  };

  return (
    <div>
      <header className={styles.header}>
        <Typography as="h1" variant="h2">
          다독다독
        </Typography>
        <IconButton
          aria-label="설정"
          size="lg"
          onClick={() => setSettingsOpen(true)}
        >
          <IoSettingsOutline size={22} />
        </IconButton>
      </header>

      <Stack as="main" gap={24} className={styles.wrapper}>
        <section>
          {totalSeconds === 0 && (
            <Typography as="h2" variant="h2">
              아직 학습 기록이 없어요.
              <br />
              오늘부터 함께 쌓아가요!
            </Typography>
          )}
          {totalSeconds > 0 && (
            <Typography as="h2" variant="h2">
              누적&nbsp;
              <Typography as="span" variant="h2" color="secondary">
                {formatTime(totalSeconds)}
              </Typography>
              &nbsp; 학습중!
              <br />
              꾸준함이 힘이에요.
            </Typography>
          )}

          {studyContext && <StudyInsightCard context={studyContext} />}

          {!isEmpty(lastStudy) && (
            <button
              className={styles.continue}
              onClick={() => navigate(`${PATHS.WORD}/${unit}`, { state: { level } })}
            >
              <AiOutlinePushpin size={20} />
              <div>
                <Typography as="h6" variant="h6">
                  이전 학습 위치에서 계속할까요?
                </Typography>
                <Typography as="p" variant="body" color="tertiary">
                  N{level} Unit {unit} · 단원당 {wordsPerUnit}단어
                </Typography>
              </div>
            </button>
          )}

          {reviewWordCount > 0 && (
            <button className={styles.continue} onClick={() => navigate(PATHS.REVIEW_WORDS)}>
              <FaBookmark size={18} />
              <div>
                <Typography as="h6" variant="h6">
                  복습할 단어 보기
                </Typography>
                <Typography as="p" variant="body" color="tertiary">
                  {reviewWordCount}개 저장됨
                </Typography>
              </div>
            </button>
          )}
        </section>
        <Stack as="section" gap={8}>
          <Typography as="h4" variant="h4">
            JLPT
          </Typography>
          <Stack as="div" gap={10}>
            {renderLevelList()}
          </Stack>
        </Stack>
      </Stack>

      {settingsOpen && (
        <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
