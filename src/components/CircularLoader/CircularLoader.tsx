import { type HTMLAttributes } from "react";

import { cls } from "@/utils";

import styles from "./CircularLoader.module.css";

import type { Color, Size } from "@styles/type";

const circularLoaderSizes: { [key in Size]: number } = {
  sm: 30,
  md: 40,
  lg: 50,
  xl: 60,
};

export type CircularLoaderProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  color?: Extract<Color, "primary" | "secondary">;
  size?: Size;
  strokeWidth?: number;
};

export const CircularLoader = ({
  color = "primary",
  size = "md",
  strokeWidth = 4,
  className,
  "aria-label": ariaLabel = "로딩 중",
  ...circularLoaderProps
}: CircularLoaderProps) => {
  const loaderSize = circularLoaderSizes[size];
  const radius = (loaderSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={styles.root}>
      <div
        className={cls(styles.container, styles[color], className)}
        style={{
          width: `${loaderSize}px`,
          height: `${loaderSize}px`,
        }}
        role="status"
        aria-label={ariaLabel}
        {...circularLoaderProps}
      >
        <svg
          className={styles.svg}
          width={loaderSize}
          height={loaderSize}
          viewBox={`0 0 ${loaderSize} ${loaderSize}`}
          aria-hidden="true"
        >
          <circle
            className={styles.circle}
            cx={loaderSize / 2}
            cy={loaderSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </svg>
      </div>
    </div>
  );
};
