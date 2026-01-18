import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimerState {
  totalSeconds: number;
  totalSecondsByLevel: Record<string, number>;
  totalSecondsByUnit: Record<string, Record<string, number>>;
  setSeconds: ({ level, unit, seconds }: { level: string; unit: string; seconds: number }) => void;
}
export const useTimerStore = create<TimerState>()(
  persist(
    (setState, getState) => ({
      totalSeconds: 0,
      totalSecondsByLevel: {},
      totalSecondsByUnit: {},
      setSeconds: ({ level, unit, seconds }) => {
        const { totalSeconds, totalSecondsByLevel, totalSecondsByUnit } = getState();

        setState({
          totalSeconds: totalSeconds + seconds,
          totalSecondsByLevel: {
            ...totalSecondsByLevel,
            [level]: (totalSecondsByLevel?.[level] ?? 0) + seconds,
          },
          totalSecondsByUnit: {
            ...totalSecondsByUnit,
            [level]: {
              ...totalSecondsByUnit[level],
              [unit]: (totalSecondsByUnit?.[level]?.[unit] ?? 0) + seconds,
            },
          },
        });
      },
    }),
    {
      name: "time-storage",
    }
  )
);
