import { BiArrowBack, BiChevronRight } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Typography } from "@/components";
import { PATHS } from "@/routes/paths.ts";

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
      <main>
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
    <div
      style={{
        flex: "0 0 calc(50% - 6px)",
        boxShadow: "0 2px 5px rgba(134, 134, 134, 0.2)",
        borderRadius: 8,
      }}
      onClick={() => onClick(unit)}
    >
      <div style={{ padding: "12px 16px" }}>
        <Stack direction="horizontal" justify="space-between" align="center">
          <Typography as="h4">UNIT {unit}</Typography>
          <BiChevronRight />
        </Stack>
        <Stack direction="horizontal" justify="space-between" align="center">
          <Typography as="p">{"0 / 50"}</Typography>
        </Stack>
      </div>
    </div>
  );
};
export default UnitPage;
