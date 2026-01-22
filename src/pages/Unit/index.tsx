import { useMemo, useCallback } from "react";

import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { Stack, Typography } from "@/components";
import { LIMIT } from "@/constants";
import { PATHS } from "@/routes/paths.ts";
import { useUnitsPerLevelQuery } from "@/services/unit/queries.ts";
import { useStudyStore } from "@/store/useStudyStore.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";

import UnitCard from "./components/UnitCard.tsx";

const UnitPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const wordProgressMap = useWordProgressStore((state) => state.wordProgressMap);
  const { lastStudy, reviewCountMap } = useStudyStore(
    useShallow((state) => ({
      lastStudy: state.lastStudy,
      reviewCountMap: state.reviewCountMap,
    }))
  );

  const { data } = useUnitsPerLevelQuery(level!, LIMIT);

  const handleUnitNavigate = useCallback(
    (unit: number) => {
      navigate(`${PATHS.WORD}/${unit}`, { state: { level } });
    },
    [navigate, level]
  );

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
      <main style={{ padding: "0 24px 24px" }}>
        <Stack direction="horizontal" gap={12} wrap="wrap">
          {units.map((wordCount, index) => {
            const unitNumber = index + 1;
            const learnedCount = wordProgressMap?.[level!]?.[unitNumber]?.learnedWords.length ?? 0;

            return (
              <UnitCard
                key={unitNumber}
                learnedCount={learnedCount}
                isLastStudy={Number(lastStudy?.[level!]) === unitNumber}
                reviewCount={reviewCountMap?.[level!]?.[unitNumber] ?? 0}
                wordCount={wordCount}
                unit={unitNumber}
                onClick={handleUnitNavigate}
              />
            );
          })}
        </Stack>
      </main>
    </div>
  );
};

export default UnitPage;
