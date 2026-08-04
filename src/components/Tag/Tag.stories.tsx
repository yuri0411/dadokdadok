import { Stack } from "@/components";

import { Tag } from "./Tag";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Tag",
  component: Tag,
  args: { label: "2 회독", color: "secondary", size: "sm" },
  argTypes: {
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "disabled"],
    },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Colors: Story = {
  render: (args) => (
    <Stack direction="horizontal" gap="var(--spacing-2)" align="center">
      <Tag {...args} color="primary" label="Primary" />
      <Tag {...args} color="secondary" label="Secondary" />
      <Tag {...args} color="tertiary" label="Tertiary" />
      <Tag {...args} color="disabled" label="Disabled" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="horizontal" gap="var(--spacing-2)" align="center">
      <Tag {...args} size="sm" label="Small" />
      <Tag {...args} size="md" label="Medium" />
      <Tag {...args} size="lg" label="Large" />
      <Tag {...args} size="xl" label="Extra large" />
    </Stack>
  ),
};
