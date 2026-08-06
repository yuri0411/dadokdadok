import { useState } from "react";

import { FaCheck } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";

import { Stack, Typography } from "@/components";
import type { Word } from "@/services/word/types.ts";
import { cls } from "@/utils";

import styles from "./WordCard.module.css";

interface WordCardProps {
  word: Word;
  onRepeatClick: (wordId: number) => void;
  onLearnedClick: (wordId: number) => void;
}

const WordCard = ({ word, onRepeatClick, onLearnedClick }: WordCardProps) => {
  const [showFurigana, setShowFurigana] = useState(false);
  const [showKorean, setShowKorean] = useState(false);

  const resetToggleStates = () => {
    setShowFurigana(false);
    setShowKorean(false);
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
