import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

import { cls } from "@/utils";

import styles from "./IconButton.module.css";

import type { Color, Size } from "@styles/type";

type IconButtonSize = Extract<Size, "sm" | "md" | "lg">;
type IconButtonVariant = "soft" | "ghost";
type IconButtonColor = Extract<Color, "primary" | "secondary" | "tertiary">;

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children" | "color"> {
  "aria-label": string;
  children: ReactNode;
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  active?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = "soft",
      color = "tertiary",
      size = "md",
      type = "button",
      disabled = false,
      active = false,
      className,
      children,
      "aria-pressed": ariaPressed,
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
        [styles.active]: active,
      },
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-pressed={ariaPressed ?? (active || undefined)}
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-active={active || undefined}
        className={mergedClassName}
        {...buttonProps}
      >
        <span className={styles.icon} aria-hidden="true">
          {children}
        </span>
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
