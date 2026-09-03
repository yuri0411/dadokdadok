import {
  jlptVocaControllerCreateExampleSentence,
  jlptVocaControllerList,
  jlptVocaControllerRandomByIds,
} from "@/services/generated/api.ts";

export const getWordsPerUnit = (level: string, limit: number, page: number) =>
  jlptVocaControllerList({ level, limit, page, onlyMeta: false });

export const getRandomWords = (ids: number[]) => jlptVocaControllerRandomByIds({ ids });

export const getExampleSentence = (word: string) =>
  jlptVocaControllerCreateExampleSentence({ word });
