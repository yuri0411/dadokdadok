import { create } from "zustand";

interface ModalState {
  open: boolean;
  close: () => void;
  payload?: {
    level: string;
    reviewCount: number;
    seconds: number;
  };
  openModal: ({
    level,
    reviewCount,
    seconds,
  }: {
    level: string;
    reviewCount: number;
    seconds: number;
  }) => void;
}
export const useModalStore = create<ModalState>((setState) => ({
  open: false,
  payload: undefined,
  close: () => {
    setState({ open: false });
  },
  openModal: ({ level, reviewCount, seconds }) => {
    setState({ open: true, payload: { level, reviewCount, seconds } });
  },
}));
