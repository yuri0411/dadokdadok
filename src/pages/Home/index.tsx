import { Stack, Typography } from "@/components";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths.ts";

const LEVELS = [5, 4, 3, 2, 1];

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = (level: number) => {
    navigate(`${PATHS.UNIT}/${level}`);
  };
  return (
    <main>
      <section>
        <Typography as="h3">누적 {} 학습중!</Typography>
        <Typography as="h3">꾸준함이 힘이에요.</Typography>
        <div>
          <Typography as="h5">이전 학습 위치에서 계속할까요?</Typography>
          <Typography as="p">N5 DAY 1</Typography>
        </div>
      </section>
      <section>
        <h3>JLPT</h3>
        <Stack as="div" gap={10}>
          {LEVELS.map((level) => (
            <ListItem level={level} onclick={handleClick} />
          ))}
        </Stack>
      </section>
    </main>
  );
};

const ListItem = ({ level, onclick }: { level: number; onclick: (level: number) => void }) => {
  return (
    <div
      onClick={() => onclick(level)}
      style={{
        boxShadow: "0 2px 5px rgba(134, 134, 134, 0.2)",
        borderRadius: 8,
        padding: "12px 16px",
      }}
    >
      <div>
        <div>
          <Typography as="h4">N{level}</Typography>
          <Typography as="p">누적 학습 시간: 1시간 23분</Typography>
        </div>
        <Typography as="span">학습중</Typography>
      </div>
      <div>progress bar</div>
    </div>
  );
};
export default HomePage;
