import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StudyState {
  lastStudy: Record<string, string>;
  latestStudy: { level: string; unit: string } | null;
  setLastStudy: (level: string, unit: string) => void;
  reviewCountMap: Record<string, Record<string, number>>;
  setReviewCount: (level: string, unit: string) => void;
  resetStudyInfo: () => void;
}
export const useStudyStore = create<StudyState>()(
  persist(
    (setState, getState) => ({
      lastStudy: {},
      latestStudy: null,
      setLastStudy: (level, unit) => {
        setState((state) => ({
          lastStudy: { ...state.lastStudy, [level]: unit },
          latestStudy: { level, unit },
        }));
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
      resetStudyInfo: () => {
        setState({ lastStudy: {}, latestStudy: null, reviewCountMap: {} });
      },
    }),
    {
      name: "study-info",
    }
  )
);
