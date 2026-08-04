import type { Preview } from "@storybook/react-vite";

import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default preview;
