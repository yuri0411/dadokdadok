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
  setRepeatWord: (level: string, unit: string, wordId: number) => void;
  setLearnedWord: (level: string, unit: string, wordId: number) => void;
  setWordProgressReset: (level: string, unit: string) => void;
  setRepeatWordsReset: (level: string, unit: string) => void;
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
      setRepeatWord: (level, unit, wordId) => {
        const { wordProgressMap } = getState();
        const repeatWords = [
          ...new Set([...(wordProgressMap?.[level]?.[unit]?.repeatWords ?? []), wordId]),
        ];
        const learnedWords = wordProgressMap?.[level]?.[unit]?.learnedWords
          ?.filter((id) => id !== wordId)
          .filter(Boolean);
        setState({
          wordProgressMap: {
            ...wordProgressMap,
            [level]: {
              [unit]: {
                repeatWords,
                learnedWords,
              },
            },
          },
        });
      },
      setLearnedWord: (level, unit, wordId) => {
        const { wordProgressMap } = getState();
        const repeatWords = wordProgressMap?.[level]?.[unit]?.repeatWords
          ?.filter((id) => id !== wordId)
          .filter(Boolean);
        const learnedWords = [
          ...new Set([...(wordProgressMap?.[level]?.[unit]?.learnedWords ?? []), wordId]),
        ];
        setState({
          wordProgressMap: {
            ...wordProgressMap,
            [level]: {
              ...wordProgressMap[level],
              [unit]: {
                repeatWords,
                learnedWords,
              },
            },
          },
        });
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
      setRepeatWordsReset: (level: string, unit: string) => {
        const { wordProgressMap } = getState();
        setState({
          wordProgressMap: {
            ...wordProgressMap,
            [level]: {
              ...wordProgressMap[level],
              [unit]: { ...wordProgressMap[level][unit], repeatWords: [] },
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
