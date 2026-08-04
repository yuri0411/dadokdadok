import { fn } from "storybook/test";

import { Typography } from "@/components";

import { Modal } from "./Modal";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Modal",
  component: Modal,
  args: {
    open: true,
    title: "학습을 마치시겠어요?",
    closeText: "취소",
    confirmText: "확인",
    onClose: fn(),
    onConfirm: fn(),
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Typography align="center">현재까지의 학습 내용은 저장됩니다.</Typography>,
  },
};

export const ConfirmLoading: Story = {
  args: {
    confirmLoading: true,
    children: <Typography align="center">학습 결과를 저장하고 있습니다.</Typography>,
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <Typography align="center">
        지금 학습을 종료해도 완료한 단어와 다시 볼 단어가 모두 저장됩니다. 다음 학습에서 이어서
        진행할 수 있습니다.
      </Typography>
    ),
  },
};
