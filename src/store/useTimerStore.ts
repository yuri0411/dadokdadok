import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimerState {
  totalSeconds: number;
  totalSecondsByLevel: Record<string, number>;
  setSeconds: ({ level, seconds }: { level: string; seconds: number }) => void;
}
export const useTimerStore = create<TimerState>()(
  persist(
    (setState, getState) => ({
      totalSeconds: 0,
      totalSecondsByLevel: {},
      setSeconds: ({ level, seconds }) => {
        const { totalSeconds, totalSecondsByLevel } = getState();

        setState({
          totalSeconds: totalSeconds + seconds,
          totalSecondsByLevel: {
            ...totalSecondsByLevel,
            [level]: (totalSecondsByLevel?.[level] ?? 0) + seconds,
          },
        });
      },
    }),
    {
      name: "time-storage",
    }
  )
);
