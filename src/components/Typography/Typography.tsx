import type { ComponentPropsWithRef, CSSProperties, ElementType, PropsWithChildren } from "react";

import { typography } from "@/styles/theme";
import { cls } from "@/utils";

import styles from "./Typography.module.css";

import type { Color, Typography as TypoVariant } from "@styles/type";

interface TypographyOwnProps<Element extends ElementType> {
  as?: Element;
  variant?: TypoVariant;
  align?: CSSProperties["textAlign"];
  color?: Color | "inherit";
}

type TypographyProps<Element extends ElementType = "p"> = PropsWithChildren<
  TypographyOwnProps<Element>
> &
  Omit<ComponentPropsWithRef<Element>, keyof TypographyOwnProps<Element>>;

export const Typography = <Element extends ElementType = "p">({
  as,
  variant = "body",
  color = "default",
  align = "left",
  style,
  className,
  children,
  ...typographyProps
}: TypographyProps<Element>) => {
  const Component = as ?? "p";
  const mergedClass = cls(typography[variant], styles[color], className);

  return (
    <Component
      className={mergedClass}
      style={{
        textAlign: align,
        ...style,
      }}
      {...typographyProps}
    >
      {children}
    </Component>
  );
};
