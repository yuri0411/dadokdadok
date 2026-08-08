import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WordReviewState {
  reviewWordIds: Record<string, number[]>;
  isReviewWord: (level: string, id: number) => boolean;
  toggleReviewWord: (level: string, id: number) => void;
  getReviewWordCount: () => number;
  getReviewWordIds: () => number[];
}

const STORAGE_KEY = "wordReview";
const LEGACY_STORAGE_KEY = "wordBookmark";

type LegacyPersistedState = {
  bookmarkedIds?: Record<string, number[]>;
  reviewWordIds?: Record<string, number[]>;
};

const storage = createJSONStorage(() => ({
  getItem: (name) => {
    const value = localStorage.getItem(name);
    if (value != null) return value;

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy == null) return null;

    localStorage.setItem(name, legacy);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    return legacy;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, value);
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
}));

export const useWordReviewStore = create<WordReviewState>()(
  persist(
    (setState, getState) => ({
      reviewWordIds: {},
      isReviewWord: (level, id) => {
        const { reviewWordIds } = getState();
        return reviewWordIds[level]?.includes(id) ?? false;
      },
      toggleReviewWord: (level, id) => {
        const { reviewWordIds } = getState();
        const currentIds = reviewWordIds[level] ?? [];
        const nextIds = currentIds.includes(id)
          ? currentIds.filter((reviewWordId) => reviewWordId !== id)
          : [...currentIds, id];

        setState({
          reviewWordIds: {
            ...reviewWordIds,
            [level]: nextIds,
          },
        });
      },
      getReviewWordCount: () =>
        Object.values(getState().reviewWordIds).reduce((total, ids) => total + ids.length, 0),
      getReviewWordIds: () => Object.values(getState().reviewWordIds).flat(),
    }),
    {
      name: STORAGE_KEY,
      storage,
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as LegacyPersistedState | null;
        if (!state) return { reviewWordIds: {} };

        return {
          reviewWordIds: state.reviewWordIds ?? state.bookmarkedIds ?? {},
        };
      },
    }
  )
);
