import { Tag } from "@/components";

import { Stack } from "./Stack";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Stack",
  component: Stack,
  args: { gap: "var(--spacing-2)" },
  argTypes: {
    direction: { control: "select", options: ["horizontal", "vertical"] },
    justify: { control: "select", options: ["flex-start", "center", "space-between"] },
    align: { control: "select", options: ["stretch", "flex-start", "center", "flex-end"] },
    as: { control: false },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    children: (
      <>
        <Tag label="첫 번째" />
        <Tag label="두 번째" />
        <Tag label="세 번째" />
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    children: (
      <>
        <Tag label="첫 번째" />
        <Tag label="두 번째" />
        <Tag label="세 번째" />
      </>
    ),
  },
};
