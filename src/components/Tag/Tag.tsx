import type { HTMLAttributes } from "react";
import styles from "./Tag.module.css";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg" | "xl";
  label: string;
}

export const Tag = ({ label, ...tagProps }: TagProps) => {
  return (
    <span className={styles.tag} {...tagProps}>
      {label}
    </span>
  );
};
