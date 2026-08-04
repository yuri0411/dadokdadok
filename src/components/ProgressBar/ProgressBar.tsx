import { type HTMLAttributes, useEffect, useState } from "react";

import { Typography } from "@/components";

import styles from "./ProgressBar.module.css";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  showLabel?: boolean;
}
export const ProgressBar = ({
  value,
  max,
  showLabel = true,
  "aria-label": ariaLabel = "학습 진행률",
  ...progressBarProps
}: ProgressBarProps) => {
  const [renderPercent, setRenderPercent] = useState(0);

  const safeMax = Math.max(max, 1);
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  const percent = Math.round((safeValue / safeMax) * 100);

  useEffect(
    function animateOnMount() {
      requestAnimationFrame(() => setRenderPercent(percent));
    },
    [percent]
  );

  return (
    <div className={styles.progressbarWrapper} {...progressBarProps}>
      <div
        className={styles.progressbar}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={safeValue}
        aria-valuetext={`${percent}%`}
      >
        <div
          className={styles.linear}
          style={{
            transform: `scaleX(${renderPercent / 100})`,
          }}
        />
      </div>
      {showLabel && (
        <Typography as="span" variant="overline" color="tertiary">
          {value} / {max}
        </Typography>
      )}
    </div>
  );
};
