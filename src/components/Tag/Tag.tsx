import type { HTMLAttributes } from "react";

import styles from "./Tag.module.css";

import type { Color, Size } from "@styles/type.ts";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: Color;
  size?: Size;
  label: string;
}

export const Tag = ({ label, ...tagProps }: TagProps) => {
  return (
    <span className={styles.tag} {...tagProps}>
      {label}
    </span>
  );
};
