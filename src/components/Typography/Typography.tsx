import type { ComponentPropsWithRef, CSSProperties, ElementType, PropsWithChildren } from "react";
import { colors, typography } from "@/styles/theme";
import { cls } from "@/utils";

interface TypographyOwnProps<Element extends ElementType = "p"> {
  as?: Element;
  variant?: keyof typeof typography;
  align?: CSSProperties["textAlign"];
  color?: "primary" | "secondary" | "tertiary";
}

type TypographyProps<Element extends ElementType = "p"> = PropsWithChildren<
  TypographyOwnProps<ElementType>
> &
  Omit<ComponentPropsWithRef<Element>, keyof TypographyOwnProps>;

export const Typography = <Element extends ElementType = "p">({
  as,
  variant = "body",
  color = "primary",
  align = "left",
  style,
  className,
  children,
  ...typographyProps
}: TypographyProps<Element>) => {
  const Component = as ?? "p";
  const mergedClass = cls(typography[variant], className);

  return (
    <Component
      className={mergedClass}
      style={{ textAlign: align, color: colors.text[color], ...style }}
      {...typographyProps}
    >
      {children}
    </Component>
  );
};
