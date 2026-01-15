import { Stack, Typography } from "@/components";
import { FaBookmark, FaCheck } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import styles from "./word.module.css";
import { useTimer } from "@/hooks/useTimer.ts";
import { useState } from "react";
import { cls } from "@/utils";
import { useTimerStore } from "@/store/useTimerStore.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal } from "@components/Modal/Modal.tsx";
import { useWordsPerUnitQuery } from "@/services/word/queries.ts";

const LIMIT = 50;
const WordPage = () => {
  const { unit } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const setSeconds = useTimerStore((state) => state.setSeconds);
  const setRepeatWord = useWordProgressStore((state) => state.setRepeatWord);
  const setLearnedWord = useWordProgressStore((state) => state.setLearnedWord);
  const { seconds, time } = useTimer();

  const { data = [] } = useWordsPerUnitQuery(location.state.level, LIMIT, Number(unit));

  const [currentCount, setCurrentCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFurigana, setShowFurigana] = useState(false);
  const [showKorean, setShowKorean] = useState(false);

  const handleConfirm = () => {
    setSeconds(seconds);
    navigate(-1);
    setShowModal(false);
  };

  const handleSaveReviewWords = (wordId: number) => {
    if (currentCount >= LIMIT) return;
    setRepeatWord(location.state.level, unit!, wordId);
    setCurrentCount((prevCount) => prevCount + 1);

    setShowFurigana(false);
    setShowKorean(false);
  };
  const handleSaveLearnedWords = (wordId: number) => {
    if (currentCount >= LIMIT) return;
    setLearnedWord(location.state.level, unit!, wordId);
    setCurrentCount((prevCount) => prevCount + 1);

    setShowFurigana(false);
    setShowKorean(false);
  };

  return (
    <div>
      <Typography as="a" onClick={() => setShowModal(true)}>
        <BiArrowBack />
      </Typography>
      <main>
        <section className={styles.time}>
          <Typography as="p" variant="body" align="center">
            현재 학습 중: {time}
          </Typography>
        </section>
        <section style={{ padding: 20 }}>
          <div className={styles.wordCard}>
            <button className={styles.bookmark} onClick={() => setIsFavorite(!isFavorite)}>
              <FaBookmark size={20} fill={isFavorite ? "#FF9533" : "#d0d0d0"} />
            </button>
            <div className={styles.content}>
              <Typography as="p" variant="overline" color="secondary" align="center">
                {currentCount + 1} / {LIMIT}
              </Typography>
              <Stack gap={16} align="center" className={styles.word}>
                <Typography
                  as="p"
                  style={{ fontSize: 24 }}
                  className={cls({ [styles.none]: !showFurigana })}
                >
                  {data[currentCount]?.furigana}
                </Typography>
                <Typography as="p" variant="headline" style={{ marginTop: "-20px" }}>
                  {data[currentCount]?.word}
                </Typography>
                <Typography
                  as="p"
                  style={{ fontSize: 24 }}
                  className={cls({ [styles.none]: !showKorean })}
                >
                  {data[currentCount]?.meaning_ko}
                </Typography>
              </Stack>
              <Stack
                gap={8}
                direction="horizontal"
                justify="center"
                className={styles.toggleButton}
              >
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
              <button onClick={() => handleSaveReviewWords(data[currentCount]?.id)}>
                <FaRepeat />
                다시볼래요
              </button>
              <button onClick={() => handleSaveLearnedWords(data[currentCount]?.id)}>
                <FaCheck />
                외웠어요
              </button>
            </Stack>
          </div>
        </section>
      </main>
      {showModal && (
        <Modal
          open={true}
          title="학습을 마치시겠어요?"
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        >
          진행중인 학습 내용은 모두 저장됩니다.
        </Modal>
      )}
    </div>
  );
};

export default WordPage;
