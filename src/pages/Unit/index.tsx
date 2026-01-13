import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Typography } from "@/components";
import { PATHS } from "@/routes/paths.ts";
import styles from "./unit.module.css";
import { FaAngleRight } from "react-icons/fa6";
import { Tag } from "@components/Tag/Tag.tsx";

const MOCK_UNIT_NUM = 10;
const UnitPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();

  const handleClick = (unit: number) => {
    navigate(`${PATHS.WORD}/${unit}`);
  };
  return (
    <div>
      <header>
        <Typography as="a" onClick={() => navigate(PATHS.ROOT)}>
          <BiArrowBack /> N{level}
        </Typography>
      </header>
      <main className={styles.wrapper}>
        <Stack direction="horizontal" gap={12} wrap="wrap">
          {Array.from({ length: MOCK_UNIT_NUM }, (_, index) => (
            <UnitCard unit={index + 1} onClick={handleClick} />
          ))}
        </Stack>
      </main>
    </div>
  );
};

const UnitCard = ({ unit, onClick }: { unit: number; onClick: (unit: number) => void }) => {
  return (
    <div className={styles.unitCard} onClick={() => onClick(unit)}>
      <Stack gap={50} style={{ padding: "12px 16px" }}>
        <Stack direction="horizontal" justify="space-between" align="center">
          <Typography as="h5" variant="h5">
            UNIT {unit}
          </Typography>
          <FaAngleRight />
        </Stack>
        <Stack direction="horizontal" justify="space-between" align="center">
          <Typography as="p" variant="body" color="secondary">
            {"0 / 50"}
          </Typography>
          <Tag label="1 회독" />
        </Stack>
      </Stack>
    </div>
  );
};
export default UnitPage;
