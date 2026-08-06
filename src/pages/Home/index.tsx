import { useCallback } from "react";

import { isEmpty } from "lodash-es";
import { AiOutlinePushpin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { ErrorFallback, Stack, Typography } from "@/components";
import LevelListItem from "@/pages/Home/components/LevelListItem.tsx";
import { LevelListSkeleton } from "@/pages/Home/components/LevelListSkeleton.tsx";
import { PATHS } from "@/routes/paths.ts";
import { useTotalByLevelQuery } from "@/services/home/queries.ts";
import { useStudyStore } from "@/store/useStudyStore.ts";
import { useTimerStore } from "@/store/useTimerStore.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";
import { formatTime } from "@/utils";

import styles from "./index.module.css";

const LEVELS = [5, 4, 3, 2, 1];

const HomePage = () => {
  const navigate = useNavigate();
  const { totalSeconds, totalSecondsByLevel } = useTimerStore(
    useShallow((state) => ({
      totalSeconds: state.totalSeconds,
      totalSecondsByLevel: state.totalSecondsByLevel,
    }))
  );

  const getLearnedWordsByLevel = useWordProgressStore((state) => state.getLearnedWordsByLevel);
  const lastStudy = useStudyStore((state) => state.lastStudy);

  const [level, unit] = Object.entries(lastStudy ?? {})[0] ?? [];

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
      <header style={{ padding: "16px 20px" }}>
        <Typography as="h1" variant="h2">
          다독다독
        </Typography>
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
                  N{level} Unit {unit}
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
    </div>
  );
};

export default HomePage;
