import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WordProgressState {
  wordProgressMap: {
    [key: string]: { [key: string]: { repeatWords: number[]; learnedWords: number[] } };
  };
  getWordProgressByUnit: (
    level: string,
    unit: string
  ) => { repeatWords: number[]; learnedWords: number[] };
  getLearnedWordsByLevel: () => { [key: string]: number };
  setWordProgressReset: (level: string, unit: string) => void;
  resetWordProgress: () => void;
  setWordProgress: ({
    level,
    unit,
    repeatWordIds,
    learnedWordIds,
  }: {
    level: string;
    unit: string;
    repeatWordIds: number[];
    learnedWordIds: number[];
  }) => void;
}

export const useWordProgressStore = create<WordProgressState>()(
  persist(
    (setState, getState) => ({
      wordProgressMap: {},
      getWordProgressByUnit: (level, unit) => {
        const { wordProgressMap } = getState();
        return wordProgressMap?.[level]?.[unit] ?? {};
      },
      getLearnedWordsByLevel: () => {
        const { wordProgressMap } = getState();

        const result: Record<string, number> = {};
        for (const level in wordProgressMap) {
          for (const unit in wordProgressMap[level]) {
            result[level] ??= 0;
            result[level] += wordProgressMap[level][unit].learnedWords.length;
          }
        }

        return result;
      },
      setWordProgressReset: (level: string, unit: string) => {
        const { wordProgressMap } = getState();
        setState({
          wordProgressMap: {
            ...wordProgressMap,
            [level]: { ...wordProgressMap[level], [unit]: { repeatWords: [], learnedWords: [] } },
          },
        });
      },
      resetWordProgress: () => {
        setState({ wordProgressMap: {} });
      },
      setWordProgress: ({ level, unit, repeatWordIds, learnedWordIds }) => {
        const { wordProgressMap } = getState();
        setState({
          wordProgressMap: {
            ...wordProgressMap,
            [level]: {
              ...wordProgressMap[level],
              [unit]: {
                repeatWords: repeatWordIds,
                learnedWords: learnedWordIds,
              },
            },
          },
        });
      },
    }),
    {
      name: "word-progress-storage",
    }
  )
);
