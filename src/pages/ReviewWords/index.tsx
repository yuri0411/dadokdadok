import { useMemo } from "react";

import { BiArrowBack } from "react-icons/bi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { CircularLoader, ErrorFallback, Stack, Typography } from "@/components";
import { PATHS } from "@/routes/paths.ts";
import { useRandomWordsQuery } from "@/services/word/queries.ts";
import type { Word } from "@/services/word/types.ts";
import { useWordReviewStore } from "@/store/useWordReviewStore.ts";
import { cls } from "@/utils";

import styles from "./index.module.css";

const LEVELS = [5, 4, 3, 2, 1];

const ReviewWordsPage = () => {
  const navigate = useNavigate();
  const reviewWordIdsMap = useWordReviewStore((state) => state.reviewWordIds);
  const toggleReviewWord = useWordReviewStore((state) => state.toggleReviewWord);

  const reviewWordIds = useMemo(
    () => Object.values(reviewWordIdsMap).flat(),
    [reviewWordIdsMap]
  );
  const { data: words = [], isPending, isError, refetch } = useRandomWordsQuery(reviewWordIds);

  const wordsByLevel = useMemo(() => {
    const grouped = new Map<number, Word[]>();
    for (const word of words) {
      const list = grouped.get(word.level) ?? [];
      list.push(word);
      grouped.set(word.level, list);
    }
    return grouped;
  }, [words]);

  const renderContent = () => {
    if (reviewWordIds.length === 0) {
      return (
        <Stack align="center" gap="var(--spacing-3)" className={styles.empty}>
          <FaRegBookmark size={28} color="var(--color-text-muted)" />
          <Typography as="p" variant="body" color="tertiary" align="center">
            아직 복습할 단어가 없어요.
            <br />
            학습 중 단어 카드에서 복습할 단어로 추가해 보세요.
          </Typography>
        </Stack>
      );
    }

    if (isPending) {
      return (
        <Stack align="center" justify="center" style={{ minHeight: 200 }}>
          <CircularLoader aria-label="복습할 단어 불러오는 중" />
        </Stack>
      );
    }

    if (isError) {
      return (
        <ErrorFallback
          title="복습할 단어를 불러오지 못했어요"
          description="잠시 후 다시 시도해 주세요."
          onRetry={() => {
            void refetch();
          }}
        />
      );
    }

    return (
      <Stack gap="var(--spacing-6)">
        {LEVELS.map((level) => {
          const levelWords = (wordsByLevel.get(level) ?? []).filter((word) =>
            reviewWordIdsMap[String(level)]?.includes(word.id)
          );
          if (levelWords.length === 0) return null;

          return (
            <Stack as="section" key={level} gap="var(--spacing-3)">
              <Typography as="h2" variant="h4">
                N{level}
                <Typography as="span" variant="body" color="tertiary">
                  {" "}
                  · {levelWords.length}개
                </Typography>
              </Typography>
              <div className={styles.grid}>
                {levelWords.map((word) => (
                  <div key={word.id} className={styles.item}>
                    <button
                      type="button"
                      className={cls(styles.reviewToggle, styles.reviewToggleActive)}
                      onClick={() => toggleReviewWord(String(level), word.id)}
                      aria-label="복습할 단어에서 제거"
                      aria-pressed={true}
                    >
                      <FaBookmark size={16} aria-hidden="true" />
                    </button>
                    <Stack gap="var(--spacing-1)" align="center" className={styles.itemBody}>
                      <Typography
                        as="p"
                        variant="overline"
                        color="tertiary"
                        align="center"
                        className={styles.furigana}
                      >
                        {word.furigana}
                      </Typography>
                      <Typography as="p" variant="h3" align="center" className={styles.word}>
                        {word.word}
                      </Typography>
                      <Typography
                        as="p"
                        variant="body"
                        color="tertiary"
                        align="center"
                        className={styles.meaning}
                      >
                        {word.meaning_ko}
                      </Typography>
                    </Stack>
                  </div>
                ))}
              </div>
            </Stack>
          );
        })}
      </Stack>
    );
  };

  return (
    <div>
      <header style={{ padding: "16px 20px" }}>
        <Typography
          as="a"
          variant="h5"
          onClick={() => navigate(PATHS.HOME)}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <BiArrowBack /> 복습할 단어
        </Typography>
      </header>
      <main className={styles.main}>{renderContent()}</main>
    </div>
  );
};

export default ReviewWordsPage;
