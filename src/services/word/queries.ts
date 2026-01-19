import { useQuery } from "@tanstack/react-query";

import { getRandomWords, getWordsPerUnit } from "@/services/word/api.ts";

export const useWordsPerUnitQuery = (level: string, limit: number, page: number) =>
  useQuery({
    queryKey: ["wordsPerUnit", level, limit, page],
    queryFn: () => getWordsPerUnit(level, limit, page),
    select: ({ data }) => data.items,
  });

export const useRandomWordsQuery = (ids: number[]) =>
  useQuery({
    queryKey: ["randomWords"],
    queryFn: () => getRandomWords(ids),
    select: ({ data }) => data,
  });
