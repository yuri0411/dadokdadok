import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimerState {
  totalSeconds: number;
  setSeconds: (seconde: number) => void;
}
export const useTimerStore = create<TimerState>()(
  persist(
    (setState, getState) => ({
      totalSeconds: 0,
      setSeconds: (seconds: number) => {
        const { totalSeconds } = getState();
        setState({ totalSeconds: totalSeconds + seconds });
      },
    }),
    {
      name: "time-storage",
    }
  )
);
