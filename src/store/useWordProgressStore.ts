import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WordProgressState {
  wordProgressMap: {
    [key: string]: { [key: string]: { repeatWords: number[]; learnedWords: number[] } };
  };
  getLearnedWordsByLevel: () => { [key: string]: number };
  setRepeatWord: (level: string, unit: string, wordId: number) => void;
  setLearnedWord: (level: string, unit: string, wordId: number) => void;
}

export const useWordProgressStore = create<WordProgressState>()(
  persist(
    (setState, getState) => ({
      wordProgressMap: {},
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
        const learnedWords = wordProgressMap?.[level]?.[unit]?.learnedWords?.filter(
          (id) => id !== wordId
        );
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
        const repeatWords = wordProgressMap?.[level]?.[unit]?.repeatWords?.filter(
          (id) => id !== wordId
        );
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
    }),
    {
      name: "word-progress-storage",
    }
  )
);
