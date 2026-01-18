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
import { useStudyStore } from "@/store/useStudyStore.ts";

const UnitPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const wordProgressMap = useWordProgressStore((state) => state.wordProgressMap);
  const lastStudy = useStudyStore((state) => state.lastStudy);
  const reviewCountMap = useStudyStore((state) => state.reviewCountMap);

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
      <header style={{ padding: "16px 20px" }}>
        <Typography
          as="a"
          variant="h5"
          onClick={() => navigate(PATHS.ROOT)}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <BiArrowBack /> N{level}
        </Typography>
      </header>
      <main className={styles.wrapper}>
        <Stack direction="horizontal" gap={12} wrap="wrap">
          {units.map((wordCount, index) => (
            <UnitCard
              key={index}
              wordProgressMap={wordProgressMap?.[level!]?.[index + 1]?.learnedWords.length ?? 0}
              isLastStudy={Number(lastStudy?.[level!]) === index + 1}
              reviewCount={reviewCountMap?.[level!]?.[index + 1] ?? 0}
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
  reviewCount,
  unit,
  isLastStudy,
  onClick,
}: {
  wordProgressMap: number;
  wordCount: number;
  reviewCount: number;
  unit: number;
  isLastStudy: boolean;
  onClick: (unit: number) => void;
}) => (
  <div className={styles.unitCard} onClick={() => onClick(unit)}>
    <Stack gap={50} style={{ padding: "12px 16px" }}>
      <Stack direction="horizontal" justify="space-between">
        <Stack>
          <Typography as="h5" variant="h5">
            UNIT {unit}
          </Typography>
          {isLastStudy && (
            <Typography as="span" variant="overline" color="primary">
              마지막 학습
            </Typography>
          )}
        </Stack>
        <FaAngleRight />
      </Stack>
      <Stack direction="horizontal" justify="space-between" align="center">
        <Typography as="p" variant="body" color="tertiary">
          {wordProgressMap} / {wordCount}
        </Typography>
        {reviewCount > 0 && <Tag label={`${reviewCount} 회독`} />}
      </Stack>
    </Stack>
  </div>
);
export default UnitPage;
