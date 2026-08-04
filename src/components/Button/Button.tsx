import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

import { cls } from "@/utils";

import styles from "./Button.module.css";

import type { Color, Size, Variant } from "@styles/type";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  color?: Color;
  size?: Size;
  /** @deprecated `endIcon`을 사용한다. */
  icon?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  loadingText?: string;
  width?: number | string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "filled",
      color = "primary",
      size = "md",
      type = "button",
      disabled = false,
      icon,
      startIcon,
      endIcon,
      loading = false,
      loadingText = "처리 중",
      className,
      width,
      style,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const resolvedEndIcon = endIcon ?? icon;
    const isDisabled = disabled || loading;
    const hasIcon = Boolean(startIcon || resolvedEndIcon);
    const mergedClassName = cls(
      styles.root,
      styles[variant],
      styles[size],
      styles[color],
      {
        [styles.disabled]: isDisabled,
        [styles.iconButton]: hasIcon,
      },
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-variant={variant}
        data-color={color}
        data-size={size}
        className={mergedClassName}
        style={{ width: typeof width === "number" ? `${width}px` : width, ...style }}
        {...buttonProps}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {startIcon && !loading && (
          <span className={styles.startIcon} aria-hidden="true">
            {startIcon}
          </span>
        )}
        <span className={styles.content}>{loading ? loadingText : children}</span>
        {resolvedEndIcon && !loading && (
          <span className={styles.endIcon} aria-hidden="true">
            {resolvedEndIcon}
          </span>
        )}
      </button>
    );
  }
);
