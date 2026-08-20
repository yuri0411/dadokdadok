import { FaQuoteLeft } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiBookmark3Line } from "react-icons/ri";
import { fn } from "storybook/test";

import { Stack } from "@/components";

import { IconButton } from "./IconButton";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  args: {
    "aria-label": "설정",
    children: <IoSettingsOutline size={18} />,
    variant: "soft",
    color: "tertiary",
    size: "md",
    onClick: fn(),
  },
  argTypes: {
    variant: { control: "select", options: ["soft", "ghost"] },
    color: { control: "select", options: ["primary", "secondary", "tertiary"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    children: { control: false },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="horizontal" gap="var(--spacing-3)" align="center">
      <IconButton {...args} variant="soft" aria-label="soft">
        <IoSettingsOutline size={18} />
      </IconButton>
      <IconButton {...args} variant="ghost" aria-label="ghost">
        <IoSettingsOutline size={18} />
      </IconButton>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="horizontal" gap="var(--spacing-3)" align="center">
      <IconButton {...args} size="sm" aria-label="small">
        <IoSettingsOutline size={16} />
      </IconButton>
      <IconButton {...args} size="md" aria-label="medium">
        <IoSettingsOutline size={18} />
      </IconButton>
      <IconButton {...args} size="lg" aria-label="large">
        <IoSettingsOutline size={22} />
      </IconButton>
    </Stack>
  ),
};

export const Active: Story = {
  render: (args) => (
    <Stack direction="horizontal" gap="var(--spacing-3)" align="center">
      <IconButton {...args} aria-label="복습할 단어에 추가" active={false}>
        <RiBookmark3Line size={18} />
      </IconButton>
      <IconButton {...args} aria-label="복습할 단어에서 제거" active>
        <RiBookmark3Line size={18} />
      </IconButton>
      <IconButton {...args} aria-label="예문 보기" active>
        <FaQuoteLeft size={16} />
      </IconButton>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
