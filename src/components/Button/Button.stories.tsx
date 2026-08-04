import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { fn, userEvent, within } from "storybook/test";

import { Stack } from "@/components";

import { Button } from "./Button";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "버튼",
    variant: "filled",
    color: "primary",
    size: "md",
    onClick: fn(),
  },
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined", "ghost"] },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "disabled"],
    },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    startIcon: { control: false },
    endIcon: { control: false },
    icon: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="horizontal" gap="var(--spacing-3)" align="center">
      <Button {...args} variant="filled">
        Filled
      </Button>
      <Button {...args} variant="outlined" color="tertiary">
        Outlined
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="horizontal" gap="var(--spacing-3)" align="center">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="xl">
        Extra large
      </Button>
    </Stack>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true, loadingText: "저장 중" } };

export const WithIcons: Story = {
  args: {
    startIcon: <FaCheck />,
    endIcon: <FaArrowRight />,
    children: "학습 완료",
  },
};

export const LongText: Story = {
  args: {
    children: "아주 긴 버튼 텍스트가 제한된 너비에서 어떻게 표시되는지 확인합니다",
    width: 240,
  },
};

export const Hover: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole("button", { name: "버튼" }));
  },
};

export const Focus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("button", { name: "버튼" }).focus();
  },
};

export const Active: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "버튼" });
    await userEvent.pointer({ target: button, keys: "[MouseLeft>]" });
  },
};

export const MobileWidth: Story = {
  args: { width: "100%" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
