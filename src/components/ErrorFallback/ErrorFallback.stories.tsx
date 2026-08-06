import { fn } from "storybook/test";

import { ErrorFallback } from "./ErrorFallback";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/ErrorFallback",
  component: ErrorFallback,
  args: {
    title: "불러오지 못했어요",
    description: "잠시 후 다시 시도해 주세요.",
    retryLabel: "다시 시도",
    onRetry: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ErrorFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutRetry: Story = {
  args: {
    onRetry: undefined,
  },
};

export const CustomCopy: Story = {
  args: {
    title: "단어를 불러오지 못했어요",
    description: "학습을 이어가려면 다시 시도해 주세요.",
    retryLabel: "다시 불러오기",
  },
};

export const NavigateBack: Story = {
  args: {
    title: "표시할 단어가 없어요",
    description: "이전 화면으로 돌아가 단원을 다시 선택해 주세요.",
    retryLabel: "돌아가기",
  },
};
