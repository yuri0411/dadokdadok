import { useQuery } from "@tanstack/react-query";

import { getExampleSentence, getRandomWords, getWordsPerUnit } from "@/services/word/api.ts";

export const useWordsPerUnitQuery = (level: string, limit: number, page: number) =>
  useQuery({
    queryKey: ["wordsPerUnit", level, limit, page],
    queryFn: () => getWordsPerUnit(level, limit, page),
    select: (data) => data.items,
  });

export const useRandomWordsQuery = (ids: number[]) =>
  useQuery({
    queryKey: ["randomWords", ids],
    queryFn: () => getRandomWords(ids),
    enabled: ids.length > 0,
  });

export const useExampleSentenceQuery = (word: string, enabled = true) =>
  useQuery({
    queryKey: ["exampleSentence", word],
    queryFn: () => getExampleSentence(word),
    enabled: Boolean(word) && enabled,
  });
