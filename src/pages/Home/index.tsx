import { Stack, Typography } from "@/components";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths.ts";
import styles from "./home.module.css";

const LEVELS = [5, 4, 3, 2, 1];

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = (level: number) => {
    navigate(`${PATHS.UNIT}/${level}`);
  };
  return (
    <Stack as="main" gap={24} className={styles.wrapper}>
      <section>
        <Typography as="h2" variant="h2">
          누적&nbsp;
          <Typography as="span" variant="h2">
            1시간 20분
          </Typography>
          &nbsp; 학습중!
          <br />
          꾸준함이 힘이에요.
        </Typography>
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
          {LEVELS.map((level) => (
            <ListItem level={level} onclick={handleClick} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const ListItem = ({ level, onclick }: { level: number; onclick: (level: number) => void }) => {
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
      <div>progress bar</div>
    </div>
  );
};
export default HomePage;
