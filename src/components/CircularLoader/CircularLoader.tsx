import { type HTMLAttributes } from "react";

import { cls } from "@/utils";
import { colors } from "@styles/theme.ts";

import styles from "./CircularLoader.module.css";

export type CircularLoaderProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  color?: Extract<keyof typeof colors, "primary" | "secondary">;
  size?: number;
  strokeWidth?: number;
};

export const CircularLoader = ({
  color = "primary",
  size = 40,
  strokeWidth = 4,
  className,
  ...circularLoaderProps
}: CircularLoaderProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={styles.root}>
      <div
        className={cls(styles.container, className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        role="status"
        {...circularLoaderProps}
      >
        <svg
          className={styles.svg}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
          color={colors[color]}
        >
          <circle
            className={styles.circle}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </svg>
      </div>
    </div>
  );
};
