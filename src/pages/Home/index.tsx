import { Stack, Typography } from "@/components";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths.ts";
import styles from "./index.module.css";
import { useTimerStore } from "@/store/useTimerStore.ts";
import { formatTime } from "@/utils";
import { useTotalByLevelQuery } from "@/services/home/queries.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";
import { isEmpty } from "lodash-es";
import { useStudyStore } from "@/store/useStudyStore.ts";
import { AiOutlinePushpin } from "react-icons/ai";
import LevelListItem from "@/pages/Home/components/LevelListItem.tsx";
import { useCallback } from "react";

const LEVELS = [5, 4, 3, 2, 1];

const HomePage = () => {
  const navigate = useNavigate();
  const totalSeconds = useTimerStore((state) => state.totalSeconds);
  const getLearnedWordsByLevel = useWordProgressStore((state) => state.getLearnedWordsByLevel);
  const totalSecondsByLevel = useTimerStore((state) => state.totalSecondsByLevel);
  const lastStudy = useStudyStore((state) => state.lastStudy);

  const [level, unit] = Object.entries(lastStudy ?? {})[0] ?? [];

  const { data: totalByLevel } = useTotalByLevelQuery();

  const handleLevelNavigate = useCallback(
    (level: number) => navigate(`${PATHS.UNIT}/${level}`),
    [navigate]
  );
  console.log(lastStudy);

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
            {totalByLevel &&
              LEVELS.map((level) => (
                <LevelListItem
                  key={level}
                  current={getLearnedWordsByLevel()[level] ?? 0}
                  total={totalByLevel[level]}
                  learningTime={totalSecondsByLevel?.[level] ?? 0}
                  level={level}
                  onClick={handleLevelNavigate}
                />
              ))}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default HomePage;
