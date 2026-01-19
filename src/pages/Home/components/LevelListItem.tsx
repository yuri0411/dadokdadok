import { Stack, Typography } from "@/components";
import { ProgressBar } from "@components/ProgressBar/ProgressBar.tsx";
import styles from "./LevelListItem.module.css";
import { formatTime } from "@/utils";

interface LevelListItemProps {
  level: number;
  current: number;
  total: number;
  learningTime: number;
  onClick: (level: number) => void;
}

const LevelListItem = ({ level, current, total, learningTime, onClick }: LevelListItemProps) => {
  const renderLearningStatus = () => {
    if (current === total) {
      return (
        <Typography as="span" variant="overline">
          학습완료
        </Typography>
      );
    }

    if (learningTime > 0) {
      return (
        <Typography as="span" variant="overline" color="primary">
          학습중
        </Typography>
      );
    }

    return (
      <Typography as="span" variant="overline" color="tertiary">
        미학습
      </Typography>
    );
  };

  return (
    <div
      className={styles.listItem}
      onClick={() => {
        onClick(level);
      }}
    >
      <Stack direction="horizontal" justify="space-between">
        <div>
          <Typography as="h4" variant="h5">
            N{level}
          </Typography>
          {learningTime > 0 && (
            <Typography as="p" variant="body" color="tertiary">
              누적 학습 시간: {formatTime(learningTime)}
            </Typography>
          )}
        </div>
        {renderLearningStatus()}
      </Stack>
      <ProgressBar value={current} max={total} />
    </div>
  );
};

export default LevelListItem;
