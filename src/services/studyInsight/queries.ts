import { useQuery } from "@tanstack/react-query";

import { createStudyInsight } from "@/services/studyInsight/api.ts";
import type { TodayStudyContext } from "@/services/studyInsight/types.ts";

export const useStudyInsightQuery = (context?: TodayStudyContext) =>
  useQuery({
    queryKey: ["studyInsight", context],
    queryFn: async () => {
      if (!context) throw new Error("학습 상태가 없습니다.");

      const { data } = await createStudyInsight(context);
      return data;
    },
    enabled: context != null,
    staleTime: Infinity,
    retry: 1,
  });
