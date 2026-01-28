import { useState } from "react";

import { FaCheck } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";

import { CircularLoader, Stack, Typography } from "@/components";
import type { Word } from "@/services/word/types.ts";
import { cls } from "@/utils";

import styles from "./WordCard.module.css";

interface WordCardProps {
  // level: string;
  word: Word;
  isLoading: boolean;
  onRepeatClick: (wordId: number) => void;
  onLearnedClick: (wordId: number) => void;
}

const WordCard = ({
  // level,
  word,
  isLoading,
  onRepeatClick,
  onLearnedClick,
}: WordCardProps) => {
  // TODO 기획 구체화되면 구현
  // const toggleBookmark = useWordBookmarkStore(useShallow((state) => state.toggleBookmark));
  // const isBookmarked = useWordBookmarkStore((state) => state.isBookmarked(level, word?.id));

  const [showFurigana, setShowFurigana] = useState(false);
  const [showKorean, setShowKorean] = useState(false);

  const resetToggleStates = () => {
    setShowFurigana(false);
    setShowKorean(false);
  };

  if (isLoading) return <CircularLoader />;
  return (
    <div className={styles.wordCard}>
      {/* TODO 기획 구체화되면 구현
      <button className={styles.bookmark} onClick={() => toggleBookmark(level, word?.id)}>*/}
      {/*  <FaBookmark size={20} fill={isBookmarked ? "#FF9533" : "#d0d0d0"} />*/}
      {/*</button>*/}
      <div className={styles.content}>
        <Typography as="p" variant="overline" color="tertiary" align="center">
          [ {word?.id} ]
        </Typography>
        <Stack gap={16} align="center" className={styles.word}>
          <Typography
            as="p"
            style={{ fontSize: 24 }}
            className={cls({ [styles.none]: !showFurigana })}
          >
            {word?.furigana}
          </Typography>
          <Typography as="p" variant="headline" color="primary" style={{ marginTop: "-20px" }}>
            {word?.word}
          </Typography>
          <Typography
            as="p"
            style={{ fontSize: 24 }}
            className={cls({ [styles.none]: !showKorean })}
          >
            {word?.meaning_ko}
          </Typography>
        </Stack>

        <Stack gap={8} direction="horizontal" justify="center" className={styles.toggleButton}>
          <button
            onClick={() => setShowFurigana((prevState) => !prevState)}
            className={cls({ [styles.active]: showFurigana })}
          >
            ふりがな
          </button>
          <button
            onClick={() => setShowKorean((prevState) => !prevState)}
            className={cls({ [styles.active]: showKorean })}
          >
            韓国語
          </button>
        </Stack>
      </div>
      <Stack direction="horizontal" align="center" className={styles.action}>
        <button
          onClick={() => {
            onRepeatClick(word.id);
            resetToggleStates();
          }}
        >
          <FaRepeat />
          다시볼래요
        </button>
        <button
          onClick={() => {
            onLearnedClick(word.id);
            resetToggleStates();
          }}
        >
          <FaCheck />
          외웠어요
        </button>
      </Stack>
    </div>
  );
};

export default WordCard;
