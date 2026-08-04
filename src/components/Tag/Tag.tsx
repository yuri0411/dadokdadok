import type { HTMLAttributes } from "react";

import { cls } from "@/utils";

import styles from "./Tag.module.css";

import type { Color, Size } from "@styles/type.ts";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: Color;
  size?: Size;
  label: string;
}

export const Tag = ({
  label,
  color = "secondary",
  size = "sm",
  className,
  ...tagProps
}: TagProps) => {
  return (
    <span
      className={cls(styles.tag, styles[color], styles[size], className)}
      data-color={color}
      data-size={size}
      {...tagProps}
    >
      {label}
    </span>
  );
};
