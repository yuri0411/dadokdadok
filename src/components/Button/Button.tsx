import {
  type ButtonHTMLAttributes,
  forwardRef,
  type PropsWithChildren,
  type ReactNode,
} from "react";

import { Typography } from "@/components";
import { cls } from "@/utils";

import styles from "./Button.module.css";

import type { Color, Size, Variant } from "@styles/type";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    variant?: Variant;
    color?: Color;
    size?: Size;
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
      styles.root,
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
