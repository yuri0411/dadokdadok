import { Stack, Typography } from "@/components";
import { FaBookmark, FaCheck } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import styles from "./word.module.css";
import { useTimer } from "@/hooks/useTimer.ts";
import { useMemo, useState } from "react";
import { cls } from "@/utils";
import { useTimerStore } from "@/store/useTimerStore.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal } from "@components/Modal/Modal.tsx";
import { useRandomWordsQuery, useWordsPerUnitQuery } from "@/services/word/queries.ts";
import { isEmpty } from "lodash-es";

const LIMIT = 10;
const WordPage = () => {
  const { unit } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const level = location.state?.level;

  const setSeconds = useTimerStore((state) => state.setSeconds);
  const setWordProgress = useWordProgressStore((state) => state.setWordProgress);
  const setWordProgressReset = useWordProgressStore((state) => state.setWordProgressReset);
  const getWordProgressByUnit = useWordProgressStore((state) => state.getWordProgressByUnit);

  const { repeatWords = [], learnedWords = [] } = getWordProgressByUnit(level, unit!);

  const { seconds, time } = useTimer();
  const [repeatWordIds, setRepeatWordIds] = useState<number[]>(repeatWords);
  const [learnedWordIds, setLearnedWordIds] = useState<number[]>(learnedWords);

  const { data = [], refetch } = useWordsPerUnitQuery(level, LIMIT, Number(unit));
  const { data: randomWords = [], refetch: refetchRandomWords } =
    useRandomWordsQuery(repeatWordIds);

  const words = useMemo(() => {
    if (!isEmpty(repeatWords) && repeatWords.length + learnedWords.length >= LIMIT) {
      return randomWords;
    } else {
      return data.filter(
        (word) =>
          ![...(learnedWords.length === LIMIT ? [] : learnedWords), ...repeatWords].includes(
            word.id
          )
      );
    }
  }, [data, learnedWords, randomWords, repeatWords]);

  const [currentCount, setCurrentCount] = useState(0);
  const [modalType, setModalType] = useState<"stop" | "repeat" | "complete">();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFurigana, setShowFurigana] = useState(false);
  const [showKorean, setShowKorean] = useState(false);

  const handleConfirm = () => {
    setSeconds(seconds);
    navigate(-1);
    setModalType(undefined);
    setWordProgress({ learnedWordIds, repeatWordIds, level, unit: unit! });
    // TODO 회독 수 저장
    // 마지막 단원 저장
  };

  const repeatStudy = () => {
    refetchRandomWords().then(() => {
      setModalType(undefined);
      setCurrentCount(0);
      setWordProgress({ learnedWordIds, repeatWordIds, level, unit: unit! });
    });
  };
  const completeStudy = () => {
    refetch();
    setCurrentCount(0);
    setWordProgressReset(level, unit!);
    setRepeatWordIds([]);
    setLearnedWordIds([]);
    setModalType(undefined);
  };

  const goNext = () => {
    setShowFurigana(false);
    setShowKorean(false);

    if (currentCount < words.length - 1) {
      setCurrentCount((prevCount) => prevCount + 1);
      return;
    }
    // TODO 타이머 일시 정지
    if (repeatWordIds.length === 1) {
      setModalType("complete");
    } else {
      setModalType("repeat");
    }
  };

  return (
    <div>
      <header style={{ padding: "16px 20px" }}>
        <Typography
          as="a"
          variant="h5"
          onClick={() => setModalType("stop")}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <BiArrowBack /> N{level} Unit{unit}
        </Typography>
      </header>
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
                {currentCount + 1} / {words.length}
              </Typography>
              <Stack gap={16} align="center" className={styles.word}>
                <Typography
                  as="p"
                  style={{ fontSize: 24 }}
                  className={cls({ [styles.none]: !showFurigana })}
                >
                  {words[currentCount]?.furigana}
                </Typography>
                <Typography as="p" variant="headline" style={{ marginTop: "-20px" }}>
                  {words[currentCount]?.word}
                </Typography>
                <Typography
                  as="p"
                  style={{ fontSize: 24 }}
                  className={cls({ [styles.none]: !showKorean })}
                >
                  {words[currentCount]?.meaning_ko}
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
              <button
                onClick={() => {
                  setRepeatWordIds((ids) => [...new Set([...ids, words[currentCount].id])]);
                  setLearnedWordIds((ids) => ids.filter((id) => id !== words[currentCount].id));
                  goNext();
                }}
              >
                <FaRepeat />
                다시볼래요
              </button>
              <button
                onClick={() => {
                  setRepeatWordIds((ids) => ids.filter((id) => id !== words[currentCount].id));
                  setLearnedWordIds((ids) => [...new Set([...ids, words[currentCount].id])]);
                  goNext();
                }}
              >
                <FaCheck />
                외웠어요
              </button>
            </Stack>
          </div>
        </section>
      </main>
      {modalType === "stop" && (
        <Modal
          open={true}
          title="학습을 마치시겠어요?"
          onClose={() => setModalType(undefined)}
          onConfirm={handleConfirm}
        >
          진행중인 학습 내용은 모두 저장됩니다.
        </Modal>
      )}
      {modalType === "repeat" && (
        <Modal
          open={true}
          title="다시 볼 단어들을 무작위 순서로 모아봤어요."
          closeText="마무리하기"
          onClose={handleConfirm}
          onConfirm={repeatStudy}
          confirmText="복습 시작"
        >
          하나씩 다시 외워볼까요?
        </Modal>
      )}
      {modalType === "complete" && (
        <Modal
          open={true}
          title="학습을 모두 마쳤어요!"
          closeText="마무리하기"
          onClose={handleConfirm}
          onConfirm={completeStudy}
          confirmText="한번 더 보기"
        >
          <Stack gap={12}>
            <dl style={{ padding: "20px 36px", background: "#F8F8F8", borderRadius: 8 }}>
              <dt>레벨</dt>
              <dd>JLPT N{location.state.level}</dd>
              <dt>회독 수</dt>
              <dd>{} 회</dd>
              <dt>학습 시간</dt>
              <dd></dd>
            </dl>
            <Typography as="p">
              기억이 더 오래 남도록 이번 장을 한 번 더 돌아보는 건 어떨까요?
            </Typography>
          </Stack>
        </Modal>
      )}
    </div>
  );
};

export default WordPage;
