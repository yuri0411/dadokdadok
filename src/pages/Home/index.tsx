import { Stack, Typography } from "@/components";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths.ts";
import styles from "./home.module.css";
import { useTimerStore } from "@/store/useTimerStore.ts";
import { formatTime } from "@/utils";
import { ProgressBar } from "@components/ProgressBar/ProgressBar.tsx";
import { useTotalByLevelQuery } from "@/services/home/queries.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";

const LEVELS = [5, 4, 3, 2, 1];

const HomePage = () => {
  const navigate = useNavigate();
  const totalSeconds = useTimerStore((state) => state.totalSeconds);
  const getLearnedWordsByLevel = useWordProgressStore((state) => state.getLearnedWordsByLevel);

  const { data } = useTotalByLevelQuery();
  const handleClick = (level: number) => {
    navigate(`${PATHS.UNIT}/${level}`);
  };

  return (
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

        <div className={styles.continue}>
          <Typography as="h6" variant="h6">
            이전 학습 위치에서 계속할까요?
          </Typography>
          <Typography as="p" variant="body" color="secondary">
            N5 DAY 1
          </Typography>
        </div>
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
                level={level}
                onclick={handleClick}
              />
            ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const ListItem = ({
  level,
  current,
  total,
  onclick,
}: {
  level: number;
  current: number;
  total: number;
  onclick: (level: number) => void;
}) => {
  return (
    <div className={styles.listItem} onClick={() => onclick(level)}>
      <Stack direction="horizontal" justify="space-between">
        <div>
          <Typography as="h4" variant="h5">
            N{level}
          </Typography>
          <Typography as="p" variant="body" color="secondary">
            누적 학습 시간: 1시간 23분
          </Typography>
        </div>
        <Typography as="span" variant="overline">
          학습중
        </Typography>
      </Stack>
      <ProgressBar value={current} max={total} />
    </div>
  );
};
export default HomePage;
