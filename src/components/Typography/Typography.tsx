import type { ComponentPropsWithRef, CSSProperties, ElementType, PropsWithChildren } from "react";

import { colors, typography } from "@/styles/theme";
import { cls } from "@/utils";

import type { Color, Typography as TypoVariant } from "@styles/type";

interface TypographyOwnProps<Element extends ElementType> {
  as?: Element;
  variant?: TypoVariant;
  align?: CSSProperties["textAlign"];
  color?: Color | string;
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
  const mergedClass = cls(typography[variant], className);
  const isTextColorKey = (color: string): color is keyof typeof colors.text => {
    return color in colors.text;
  };

  return (
    <Component
      className={mergedClass}
      style={{
        textAlign: align,
        color: isTextColorKey(color) ? colors.text[color] : color,
        ...style,
      }}
      {...typographyProps}
    >
      {children}
    </Component>
  );
};
