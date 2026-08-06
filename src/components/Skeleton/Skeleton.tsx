import type { CSSProperties, HTMLAttributes } from "react";

import { cls } from "@/utils";

import styles from "./Skeleton.module.css";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  width?: number | string;
  height?: number | string;
  radius?: "sm" | "md" | "lg" | "full";
};

export const Skeleton = ({
  width = "100%",
  height = 16,
  radius = "md",
  className,
  style,
  ...skeletonProps
}: SkeletonProps) => {
  const mergedStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    ...style,
  };

  return (
    <div
      className={cls(styles.root, styles[radius], className)}
      style={mergedStyle}
      aria-hidden="true"
      {...skeletonProps}
    />
  );
};
