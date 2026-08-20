import { ProgressBar } from "./ProgressBar";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  args: { value: 15, max: 50, showLabel: true, color: "default" },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Complete: Story = { args: { value: 50 } };
export const Strong: Story = { args: { color: "strong" } };
export const WithoutLabel: Story = { args: { showLabel: false } };
export const ClampedValue: Story = { args: { value: 70 } };
