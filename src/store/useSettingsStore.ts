import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_WORDS_PER_UNIT, type WordCountOption } from "@/constants";

interface SettingsState {
  wordsPerUnit: WordCountOption;
  setWordsPerUnit: (wordsPerUnit: WordCountOption) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (setState) => ({
      wordsPerUnit: DEFAULT_WORDS_PER_UNIT,
      setWordsPerUnit: (wordsPerUnit) => {
        setState({ wordsPerUnit });
      },
    }),
    {
      name: "settings",
    }
  )
);
