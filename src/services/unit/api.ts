import { jlptVocaControllerList } from "@/services/generated/api.ts";

export const getUnitsPerLevel = (level: string, limit: number) =>
  jlptVocaControllerList({ level, limit, onlyMeta: true });
