import { useQuery } from "@tanstack/react-query";

import { getTotalByLevel } from "@/services/home/api.ts";

export const useTotalByLevelQuery = () =>
  useQuery({
    queryKey: ["totalByLevel"],
    queryFn: getTotalByLevel,
    select: ({ data }) => {
      const totalLevelsMap = new Map<string, number>(
        data.levels.map((level) => [level.level, level.total])
      );

      return Object.fromEntries(totalLevelsMap);
    },
  });
