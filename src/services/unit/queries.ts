import { useQuery } from "@tanstack/react-query";

import { getUnitsPerLevel } from "@/services/unit/api.ts";

export const useUnitsPerLevelQuery = (level: string, limit: number) =>
  useQuery({
    queryKey: ["unitsPerLevel", level, limit],
    queryFn: () => getUnitsPerLevel(level, limit),
    select: (data) => data.meta,
  });
