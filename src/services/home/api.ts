import { api } from "@/lib/api.ts";
import type { TotalByLevel } from "@/services/home/types.ts";

export const getTotalByLevel = () => api.get<TotalByLevel>("/jlpt-voca/totals-by-level");
