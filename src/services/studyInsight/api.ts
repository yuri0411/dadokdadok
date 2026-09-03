import { studyInsightsControllerCreateInsight } from "@/services/generated/api.ts";
import type { TodayStudyContext } from "@/services/studyInsight/types.ts";

export const createStudyInsight = (context: TodayStudyContext) =>
  studyInsightsControllerCreateInsight(context);
