import { Stack, Typography } from "@/components";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths.ts";
import styles from "./home.module.css";
import { useTimerStore } from "@/store/useTimerStore.ts";
import { formatTime } from "@/utils";
import { ProgressBar } from "@components/ProgressBar/ProgressBar.tsx";
import { useTotalByLevelQuery } from "@/services/home/queries.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";
import { isEmpty } from "lodash-es";
import { useStudyStore } from "@/store/useStudyStore.ts";

const LEVELS = [5, 4, 3, 2, 1];

const HomePage = () => {
  const navigate = useNavigate();
  const totalSeconds = useTimerStore((state) => state.totalSeconds);
  const getLearnedWordsByLevel = useWordProgressStore((state) => state.getLearnedWordsByLevel);
  const totalSecondsByLevel = useTimerStore((state) => state.totalSecondsByLevel);
  const lastStudy = useStudyStore((state) => state.lastStudy);

  const [level, unit] = Object.entries(lastStudy)[0];

  const { data } = useTotalByLevelQuery();
  const handleClick = (level: number) => {
    navigate(`${PATHS.UNIT}/${level}`);
  };

  return (
    <div>
      <header style={{ padding: "16px 20px" }}>
        <Typography as="h1" variant="h5">
          다독다독
        </Typography>
      </header>
      <Stack as="main" gap={24} className={styles.wrapper}>
        <section>
          {totalSeconds === 0 ? (
            <Typography as="h2" variant="h2">
              아직 학습 기록이 없어요.
              <br />
              오늘부터 함께 쌓아가요!
            </Typography>
          ) : (
            <Typography as="h2" variant="h2">
              누적&nbsp;
              <Typography as="span" variant="h2">
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
              <Typography as="h6" variant="h6">
                이전 학습 위치에서 계속할까요?
              </Typography>
              <Typography as="p" variant="body" color="secondary">
                N{level} Unit {unit}
              </Typography>
            </button>
          )}
        </section>
        <Stack as="section" gap={8}>
          <Typography as="h4" variant="h4">
            JLPT
          </Typography>
          <Stack as="div" gap={10}>
            {data &&
              LEVELS.map((level) => (
                <ListItem
                  key={level}
                  current={getLearnedWordsByLevel()[level] ?? 0}
                  total={data[level]}
                  learningTime={totalSecondsByLevel?.[level] ?? 0}
                  level={level}
                  onclick={handleClick}
                />
              ))}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

const ListItem = ({
  level,
  current,
  total,
  learningTime,
  onclick,
}: {
  level: number;
  current: number;
  total: number;
  learningTime: number;
  onclick: (level: number) => void;
}) => {
  const getLearningStatus = () => {
    if (current === total) {
      return (
        <Typography as="span" variant="overline" color="primary">
          힉습완료
        </Typography>
      );
    }
    if (learningTime > 0) {
      return (
        <Typography as="span" variant="overline" color="primary">
          학습중
        </Typography>
      );
    } else {
      return (
        <Typography as="span" variant="overline" color="tertiary">
          미학습
        </Typography>
      );
    }
  };
  return (
    <div className={styles.listItem} onClick={() => onclick(level)}>
      <Stack direction="horizontal" justify="space-between">
        <div>
          <Typography as="h4" variant="h5">
            N{level}
          </Typography>
          {learningTime > 0 && (
            <Typography as="p" variant="body" color="secondary">
              누적 학습 시간: {formatTime(learningTime)}
            </Typography>
          )}
        </div>
        {getLearningStatus()}
      </Stack>
      <ProgressBar value={current} max={total} />
    </div>
  );
};

export default HomePage;
