import { Stack, Typography } from "@/components";
import styles from "./UnitCard.module.css";
import { FaAngleRight } from "react-icons/fa6";
import { Tag } from "@components/Tag/Tag.tsx";

interface UnitCardProps {
  learnedCount: number;
  wordCount: number;
  reviewCount: number;
  unit: number;
  isLastStudy: boolean;
  onClick: (unit: number) => void;
}

const UnitCard = ({
  learnedCount,
  wordCount,
  reviewCount,
  unit,
  isLastStudy,
  onClick,
}: UnitCardProps) => (
  <div className={styles.unitCard} onClick={() => onClick(unit)}>
    <Stack justify="space-between" style={{ height: 140, padding: "12px 16px" }}>
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
          {learnedCount} / {wordCount}
        </Typography>
        {reviewCount > 0 && <Tag label={`${reviewCount} 회독`} />}
      </Stack>
    </Stack>
  </div>
);

export default UnitCard;
