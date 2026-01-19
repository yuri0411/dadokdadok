import {
  type ButtonHTMLAttributes,
  forwardRef,
  type PropsWithChildren,
  type ReactNode,
} from "react";

import { Typography } from "@/components";
import { cls } from "@/utils";

import styles from "./Button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    variant?: "filled" | "outlined" | "ghost";
    color?: "primary" | "secondary" | "tertiary";
    size?: "sm" | "md" | "lg" | "xl";
    icon?: ReactNode;
    width?: number | string;
  }>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "filled",
      color = "primary",
      size = "md",
      type = "button",
      disabled = false,
      icon,
      className,
      width,
      style,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const mergedClassName = cls(
      styles.button,
      styles[variant],
      styles[size],
      styles[color],
      {
        [styles.disabled]: disabled,
        [styles.iconButton]: Boolean(icon),
      },
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={mergedClassName}
        style={{ width: typeof width === "number" ? `${width}px` : width, ...style }}
        {...buttonProps}
      >
        {children}
        {icon && (
          <Typography as="span" className={styles.icon}>
            {icon}
          </Typography>
        )}
      </button>
    );
  }
);
