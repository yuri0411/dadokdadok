import { Stack } from "@/components";

import { Skeleton } from "./Skeleton";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  args: {
    width: 160,
    height: 16,
    radius: "md",
  },
  argTypes: {
    radius: { control: "select", options: ["sm", "md", "lg", "full"] },
    width: { control: "text" },
    height: { control: "text" },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Radii: Story = {
  render: (args) => (
    <Stack gap="var(--spacing-3)">
      <Skeleton {...args} radius="sm" width={120} />
      <Skeleton {...args} radius="md" width={160} />
      <Skeleton {...args} radius="lg" width={200} />
      <Skeleton {...args} radius="full" width={80} height={80} />
    </Stack>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <Stack
      gap="var(--spacing-4)"
      style={{
        width: 320,
        padding: "var(--spacing-4)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <Stack direction="horizontal" justify="space-between" align="center">
        <Skeleton width={72} height={20} />
        <Skeleton width={48} height={14} />
      </Stack>
      <Skeleton height={8} radius="full" />
      <Skeleton width="60%" height={14} />
    </Stack>
  ),
};
