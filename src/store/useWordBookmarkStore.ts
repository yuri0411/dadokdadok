import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WordBookmarkState {
  bookmarkedIds: {
    [key: string]: number[];
  };
  isBookmarked: (level: string, id?: number) => boolean;
  toggleBookmark: (level: string, id?: number) => void;
}
export const useWordBookmarkStore = create<WordBookmarkState>()(
  persist(
    (setState, getState) => ({
      bookmarkedIds: {},
      isBookmarked: (level, id) => {
        const { bookmarkedIds } = getState();
        return id ? bookmarkedIds[level]?.includes(id) : false;
      },
      toggleBookmark: (level, id) => {
        if (!id) return;
        const { bookmarkedIds } = getState();

        const ids = bookmarkedIds[level]?.includes(id)
          ? bookmarkedIds[level].filter((bookmarkedId) => bookmarkedId !== id)
          : [...(bookmarkedIds[level] ?? []), id];

        setState({
          bookmarkedIds: {
            ...bookmarkedIds,
            [level]: ids,
          },
        });
      },
    }),
    {
      name: "wordBookmark",
    }
  )
);
