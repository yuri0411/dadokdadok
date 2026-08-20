import { api } from "@/lib/api.ts";
import type { StudyInsight, TodayStudyContext } from "@/services/studyInsight/types.ts";

export const createStudyInsight = (context: TodayStudyContext) =>
  api.post<StudyInsight>("/study-insights", context);
