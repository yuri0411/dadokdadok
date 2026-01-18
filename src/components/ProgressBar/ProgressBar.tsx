import { Typography } from "@/components";
import styles from "./ProgressBar.module.css";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number;
  max: number;
}
export const ProgressBar = ({ value, max }: ProgressBarProps) => {
  const [renderPercent, setRenderPercent] = useState(0);

  const percent = Math.round((value / max) * 100);

  useEffect(
    function animateOnMount() {
      requestAnimationFrame(() => setRenderPercent(percent));
    },
    [percent]
  );

  return (
    <div className={styles.progressbarWrapper}>
      <div className={styles.progressbar}>
        <div
          className={styles.linear}
          style={{
            transform: `scaleX(${renderPercent / 100})`,
          }}
        />
      </div>
      <Typography as="span" variant="overline" color="tertiary">
        {value} / {max}
      </Typography>
    </div>
  );
};
