import type { ComponentPropsWithRef, CSSProperties, ElementType, PropsWithChildren } from "react";

interface StackOwnProps<Element extends ElementType = "div"> {
  as?: Element;
  direction?: "horizontal" | "vertical";
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  wrap?: CSSProperties["flexWrap"];
  gap?: CSSProperties["gap"];
  inline?: boolean;
}
type StackProps<Element extends ElementType = "div"> = PropsWithChildren<StackOwnProps<Element>> &
  Omit<ComponentPropsWithRef<Element>, keyof StackOwnProps>;

export const Stack = <Element extends ElementType = "div">({
  as,
  direction = "vertical",
  justify,
  align,
  wrap,
  gap,
  inline = false,
  style,
  children,
  ...stackProps
}: StackProps<Element>) => {
  const Component = as ?? "div";
  const mergedStyle: CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    flexDirection: direction === "horizontal" ? "row" : "column",
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    gap,
    ...style,
  };
  return (
    <Component style={mergedStyle} {...stackProps}>
      {children}
    </Component>
  );
};
