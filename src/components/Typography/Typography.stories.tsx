import { Stack } from "@/components";

import { Typography } from "./Typography";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Typography",
  component: Typography,
  args: { children: "다독다독 디자인 시스템" },
  argTypes: {
    variant: {
      control: "select",
      options: ["headline", "h2", "h3", "h4", "h5", "h6", "body", "body2", "caption", "overline"],
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "disabled", "inherit"],
    },
    as: { control: false },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scale: Story = {
  render: () => (
    <Stack gap="var(--spacing-4)">
      <Typography variant="headline">Headline</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body2">Body large</Typography>
      <Typography variant="body">Body</Typography>
      <Typography variant="caption">Caption</Typography>
      <Typography variant="overline">Overline</Typography>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack gap="var(--spacing-2)">
      <Typography color="default">Default</Typography>
      <Typography color="primary">Primary</Typography>
      <Typography color="secondary">Secondary</Typography>
      <Typography color="tertiary">Tertiary</Typography>
      <Typography color="disabled">Disabled</Typography>
    </Stack>
  ),
};

export const LongContent: Story = {
  args: {
    children:
      "반복 학습을 통해 단어가 자연스럽게 기억에 남도록 돕는 다독다독의 긴 본문 텍스트 예시입니다.",
    style: { maxWidth: 320 },
  },
};
