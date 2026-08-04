import type { Size, Typography } from "@styles/type.ts";

export const sizes: { [key in Size]: string } = {
  sm: "31px",
  md: "34px",
  lg: "48px",
  xl: "52px",
};

export const typography: { [key in Typography]: string } = {
  headline: "typography-headline",
  h2: "typography-h2",
  h3: "typography-h3",
  h4: "typography-h4",
  h5: "typography-h5",
  h6: "typography-h6",
  body: "typography-body",
  body2: "typography-body2",
  caption: "typography-caption",
  overline: "typography-overline",
};
