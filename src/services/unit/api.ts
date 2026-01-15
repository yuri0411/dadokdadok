import { api } from "@/lib/api.ts";
import type { UnitMeta } from "@/services/unit/types.ts";
import type { Word } from "@/services/word/types.ts";

export const getUnitsPerLevel = (level: string, limit: number) =>
  api.get<{
    items: Word[];
    meta: UnitMeta;
  }>(`/jlpt-voca/search?level=${level}&limit=${limit}&onlyMeta=true`);
