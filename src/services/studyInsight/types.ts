export type StudyInsightStatus = "not_started" | "in_progress" | "completed";

export interface TodayStudyContext {
  level: number;
  unit: number;
  targetWordCount: number;
  learnedWordCount: number;
  repeatWordCount: number;
  reviewCount: number;
  totalStudySeconds: number;
}

export interface StudyInsight {
  status: StudyInsightStatus;
  progressRate: number;
  summary: string;
  nextAction: string;
}
