import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Typography } from "@/components";
import { PATHS } from "@/routes/paths.ts";
import styles from "./unit.module.css";
import { FaAngleRight } from "react-icons/fa6";
import { Tag } from "@components/Tag/Tag.tsx";
import { useUnitsPerLevelQuery } from "@/services/unit/queries.ts";
import { useMemo } from "react";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";

const UnitPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const wordProgressMap = useWordProgressStore((state) => state.wordProgressMap);

  const { data } = useUnitsPerLevelQuery(level!, 50);

  const handleClick = (unit: number) => {
    navigate(`${PATHS.WORD}/${unit}`, { state: { level } });
  };

  const units = useMemo(() => {
    if (!data) return [];

    const { total, totalPages, limit } = data;
    if (totalPages <= 1) return [total];
    const last = total % limit || limit;

    return [...Array.from({ length: totalPages - 1 }, () => limit), last];
  }, [data]);

  return (
    <div>
      <header>
        <Typography as="a" onClick={() => navigate(PATHS.ROOT)}>
          <BiArrowBack /> N{level}
        </Typography>
      </header>
      <main className={styles.wrapper}>
        <Stack direction="horizontal" gap={12} wrap="wrap">
          {units.map((wordCount, index) => (
            <UnitCard
              key={index}
              wordProgressMap={wordProgressMap?.[level!]?.[index + 1]?.learnedWords.length ?? 0}
              wordCount={wordCount}
              unit={index + 1}
              onClick={handleClick}
            />
          ))}
        </Stack>
      </main>
    </div>
  );
};

const UnitCard = ({
  wordProgressMap,
  wordCount,
  unit,
  onClick,
}: {
  wordProgressMap: number;
  wordCount: number;
  unit: number;
  onClick: (unit: number) => void;
}) => (
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
          {wordProgressMap} / {wordCount}
        </Typography>
        <Tag label="1 회독" />
      </Stack>
    </Stack>
  </div>
);
export default UnitPage;
