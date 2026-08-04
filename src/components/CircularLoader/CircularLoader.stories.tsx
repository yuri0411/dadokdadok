import { Stack } from "@/components";

import { CircularLoader } from "./CircularLoader";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/CircularLoader",
  component: CircularLoader,
  args: { color: "primary", size: "md", strokeWidth: 4 },
  argTypes: {
    color: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof CircularLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="horizontal" gap="var(--spacing-6)" align="center">
      <CircularLoader {...args} size="sm" />
      <CircularLoader {...args} size="md" />
      <CircularLoader {...args} size="lg" />
      <CircularLoader {...args} size="xl" />
    </Stack>
  ),
};

export const Secondary: Story = { args: { color: "secondary" } };
