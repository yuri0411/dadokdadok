import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StudyState {
  lastStudy: Record<string, string>;
  setLastStudy: (level: string, unit: string) => void;
  reviewCountMap: Record<string, Record<string, number>>;
  setReviewCount: (level: string, unit: string) => void;
}
export const useStudyStore = create<StudyState>()(
  persist(
    (setState, getState) => ({
      lastStudy: {},
      setLastStudy: (level, unit) => {
        setState({ lastStudy: { [level]: unit } });
      },
      reviewCountMap: {},
      setReviewCount: (level, unit) => {
        const { reviewCountMap } = getState();
        setState({
          reviewCountMap: {
            ...reviewCountMap,
            [level]: {
              ...reviewCountMap[level],
              [unit]: (reviewCountMap?.[level]?.[unit] ?? 0) + 1,
            },
          },
        });
      },
    }),
    {
      name: "study-info",
    }
  )
);
