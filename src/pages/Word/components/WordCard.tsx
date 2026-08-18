import { useState } from "react";

import { FaBookmark, FaCheck, FaQuoteLeft, FaRegBookmark } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";

import { Button, IconButton, Stack, Typography } from "@/components";
import { useExampleSentenceQuery } from "@/services/word/queries.ts";
import type { Word } from "@/services/word/types.ts";
import { useWordReviewStore } from "@/store/useWordReviewStore.ts";
import { cls } from "@/utils";

import { renderExampleSentence, renderHighlightedMeaning } from "../utils/renderRubySentence";

import styles from "./WordCard.module.css";

interface WordCardProps {
  level: string;
  word: Word;
  onRepeatClick: (wordId: number) => void;
  onLearnedClick: (wordId: number) => void;
}

const WordCard = ({ level, word, onRepeatClick, onLearnedClick }: WordCardProps) => {
  const [showFurigana, setShowFurigana] = useState(false);
  const [showKorean, setShowKorean] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const isReviewWord = useWordReviewStore(
    (state) => state.reviewWordIds[level]?.includes(word.id) ?? false
  );
  const toggleReviewWord = useWordReviewStore((state) => state.toggleReviewWord);

  const {
    data: sentence,
    isPending: isSentencePending,
    isError: isSentenceError,
    refetch: refetchSentence,
  } = useExampleSentenceQuery(word.word, showExample);

  const resetToggleStates = () => {
    setShowFurigana(false);
    setShowKorean(false);
    setShowExample(false);
  };

  return (
    <div className={styles.wordCard}>
      <div className={styles.content}>
        <Typography as="p" variant="overline" color="tertiary" align="center">
          [ {word.id} ]
        </Typography>
        <Stack gap={16} align="center" className={styles.word}>
          <Typography
            as="p"
            style={{ fontSize: 24 }}
            className={cls({ [styles.none]: !showFurigana })}
          >
            {word.furigana}
          </Typography>
          <Typography as="p" variant="headline" color="primary" style={{ marginTop: "-20px" }}>
            {word.word}
          </Typography>
          <Typography
            as="p"
            style={{ fontSize: 24 }}
            className={cls({ [styles.none]: !showKorean })}
          >
            {word.meaning_ko}
          </Typography>
        </Stack>

        <Stack gap={8} direction="horizontal" justify="center" className={styles.toggleButton}>
          <button
            type="button"
            onClick={() => setShowFurigana((prevState) => !prevState)}
            className={cls({ [styles.active]: showFurigana })}
            aria-pressed={showFurigana}
          >
            ふりがな
          </button>
          <button
            type="button"
            onClick={() => setShowKorean((prevState) => !prevState)}
            className={cls({ [styles.active]: showKorean })}
            aria-pressed={showKorean}
          >
            韓国語
          </button>
        </Stack>
      </div>

      {showExample && isSentencePending && (
        <Stack align="center" justify="center" className={styles.sentence}>
          <Typography as="p" variant="body" color="tertiary" align="center">
            예문을 준비중입니다
            <span className={styles.loadingDots} aria-hidden="true">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </Typography>
        </Stack>
      )}

      {showExample && isSentenceError && (
        <Stack align="center" gap="var(--spacing-3)" className={styles.sentence} role="alert">
          <Typography as="p" variant="body" color="tertiary" align="center">
            예문을 불러오지 못했어요.
          </Typography>
          <Button
            variant="outlined"
            color="tertiary"
            size="sm"
            onClick={() => {
              void refetchSentence();
            }}
          >
            다시 시도
          </Button>
        </Stack>
      )}

      {showExample && !isSentencePending && !isSentenceError && sentence && (
        <Stack align="center" gap="var(--spacing-2)" className={styles.sentence}>
          <Typography as="p" variant="body2" align="center" className={styles.sentenceText}>
            {renderExampleSentence(sentence.sentence, sentence.furigana_positions, {
              showFurigana,
              highlightWord: word.word,
              highlightClassName: styles.sentenceHighlight,
            })}
          </Typography>
          {showKorean && (
            <Typography as="p" variant="body" color="tertiary" align="center">
              {renderHighlightedMeaning(
                sentence.korean_meaning,
                sentence.word_korean_meaning,
                styles.sentenceHighlight
              )}
            </Typography>
          )}
        </Stack>
      )}

      <Stack direction="horizontal" align="center" className={styles.action}>
        <button
          type="button"
          onClick={() => {
            onRepeatClick(word.id);
            resetToggleStates();
          }}
        >
          <FaRepeat />
          다시볼래요
        </button>
        <button
          type="button"
          onClick={() => {
            onLearnedClick(word.id);
            resetToggleStates();
          }}
        >
          <FaCheck />
          외웠어요
        </button>
      </Stack>

      <div className={styles.cardToggles}>
        <IconButton
          aria-label={isReviewWord ? "복습할 단어에서 제거" : "복습할 단어에 추가"}
          active={isReviewWord}
          onClick={() => toggleReviewWord(level, word.id)}
        >
          {isReviewWord ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
        </IconButton>

        <IconButton
          aria-label={showExample ? "예문 숨기기" : "예문 보기"}
          active={showExample}
          onClick={() => setShowExample((prevState) => !prevState)}
        >
          <FaQuoteLeft size={16} />
        </IconButton>
      </div>
    </div>
  );
};

export default WordCard;
