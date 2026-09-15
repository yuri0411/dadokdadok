import { useEffect, useMemo, useRef, useState } from "react";

import { isEmpty } from "lodash-es";
import { BiArrowBack } from "react-icons/bi";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { Button, ErrorFallback, Typography } from "@/components";
import { useTimer } from "@/hooks/useTimer.ts";
import { StudyModals } from "@/pages/Word/components/StudyModals.tsx";
import { useRandomWordsQuery, useWordsPerUnitQuery } from "@/services/word/queries.ts";
import { useModalStore } from "@/store/useModalStore.ts";
import { useSettingsStore } from "@/store/useSettingsStore.ts";
import { useStudyStore } from "@/store/useStudyStore.ts";
import { useTimerStore } from "@/store/useTimerStore.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";

import WordCard from "./components/WordCard.tsx";
import { WordCardSkeleton } from "./components/WordCardSkeleton.tsx";
import styles from "./index.module.css";

const WordPage = () => {
  const { unit } = useParams();

  const location = useLocation();
  const level = location.state?.level;

  if (!unit || level == null) return <Navigate to="/" replace />;

  return <WordPageInner key={`${level}/${unit}`} unit={unit} level={level} />;
};
const WordPageInner = ({ unit, level }: { unit: string; level: string }) => {
  const navigate = useNavigate();
  const wordsPerUnit = useSettingsStore((state) => state.wordsPerUnit);

  const setSeconds = useTimerStore((state) => state.setSeconds);
  const { setWordProgress, setWordProgressReset, getWordProgressByUnit } = useWordProgressStore(
    useShallow((state) => ({
      setWordProgress: state.setWordProgress,
      setWordProgressReset: state.setWordProgressReset,
      getWordProgressByUnit: state.getWordProgressByUnit,
    }))
  );
  const { setLastStudy, setReviewCount, reviewCountMap } = useStudyStore(
    useShallow((state) => ({
      setLastStudy: state.setLastStudy,
      setReviewCount: state.setReviewCount,
      reviewCountMap: state.reviewCountMap,
    }))
  );

  // Keep this round stable while every answer is persisted immediately.
  const [round, setRound] = useState(() => getWordProgressByUnit(level, unit));
  const { repeatWords = [], learnedWords = [] } = round;

  const { seconds, time, pause: pauseTimer, resume: resumeTimer } = useTimer();

  const [repeatWordIds, setRepeatWordIds] = useState<number[]>(repeatWords);
  const [learnedWordIds, setLearnedWordIds] = useState<number[]>(learnedWords);

  const {
    data = [],
    isPending,
    isError,
    refetch,
  } = useWordsPerUnitQuery(level, wordsPerUnit, Number(unit));
  const usesRandomWords =
    !isEmpty(repeatWords) &&
    data.length > 0 &&
    repeatWords.length + learnedWords.length >= data.length;

  const {
    data: randomWords = [],
    isPending: isPendingRandomWords,
    isError: isErrorRandomWords,
    refetch: refetchRandomWords,
  } = useRandomWordsQuery(usesRandomWords ? repeatWords : []);

  const [currentCount, setCurrentCount] = useState(0);
  const [modalType, setModalType] = useState<"stop" | "repeat" | "complete">();

  const openGlobalModal = useModalStore((s) => s.openModal);

  const words = useMemo(() => {
    if (usesRandomWords) {
      return randomWords;
    }

    return data.filter(
      (word) =>
        ![...(learnedWords.length === data.length ? [] : learnedWords), ...repeatWords].includes(
          word.id
        )
    );
  }, [data, learnedWords, randomWords, repeatWords, usesRandomWords]);

  const isLoading = usesRandomWords ? isPendingRandomWords : isPending;
  const isQueryError = usesRandomWords ? isErrorRandomWords : isError;
  const currentWord = words[currentCount];

  const savedSeconds = useRef(0);
  useEffect(() => {
    const delta = seconds - savedSeconds.current;
    if (delta > 0) {
      setSeconds({ level, seconds: delta });
      savedSeconds.current = seconds;
    }
  }, [level, seconds, setSeconds]);

  useEffect(() => {
    setLastStudy(level, unit);
  }, [level, unit, setLastStudy]);

  const exitStudy = () => {
    navigate(-1);
    setModalType(undefined);
    setWordProgress({ learnedWordIds, repeatWordIds, level, unit });
    setLastStudy(level, unit);
    if (modalType !== "complete") {
      openGlobalModal({ level, reviewCount: reviewCountMap?.[level]?.[unit], seconds });
    }
  };

  const closeModal = () => {
    setModalType(undefined);
    resumeTimer();
  };

  const repeatStudy = () => {
    setRound({ repeatWords: repeatWordIds, learnedWords: learnedWordIds });
    setCurrentCount(0);
    closeModal();
  };

  const completeStudy = () => {
    setWordProgressReset(level, unit);
    setRound({ repeatWords: [], learnedWords: [] });
    setCurrentCount(0);
    setRepeatWordIds([]);
    setLearnedWordIds([]);
    closeModal();
  };

  const answerWord = (wordId: number, repeat: boolean) => {
    if (modalType || !currentWord) return;
    const nextRepeatIds = repeat
      ? [...new Set([...repeatWordIds, wordId])]
      : repeatWordIds.filter((id) => id !== wordId);
    const nextLearnedIds = repeat
      ? learnedWordIds.filter((id) => id !== wordId)
      : [...new Set([...learnedWordIds, wordId])];
    setRepeatWordIds(nextRepeatIds);
    setLearnedWordIds(nextLearnedIds);
    setWordProgress({ level, unit, repeatWordIds: nextRepeatIds, learnedWordIds: nextLearnedIds });
    setLastStudy(level, unit);

    if (currentCount < words.length - 1) {
      setCurrentCount((prevCount) => prevCount + 1);
      return;
    }
    pauseTimer();
    if (nextRepeatIds.length === 0) {
      setModalType("complete");
      setReviewCount(level, unit);
    } else {
      setModalType("repeat");
    }
  };

  const retryWords = () => {
    if (usesRandomWords) {
      void refetchRandomWords();
      return;
    }
    void refetch();
  };

  const renderWordContent = () => {
    if (isLoading) return <WordCardSkeleton />;
    if (isQueryError) {
      return (
        <ErrorFallback
          title="단어를 불러오지 못했어요"
          description="학습을 이어가려면 다시 시도해 주세요."
          onRetry={retryWords}
        />
      );
    }
    if (!currentWord) {
      return (
        <ErrorFallback
          title="표시할 단어가 없어요"
          description="이전 화면으로 돌아가 단원을 다시 선택해 주세요."
          onRetry={() => navigate(-1)}
          retryLabel="돌아가기"
        />
      );
    }

    return (
      <WordCard
        key={currentWord.id}
        level={level}
        word={currentWord}
        onRepeatClick={(wordId) => answerWord(wordId, true)}
        onLearnedClick={(wordId) => answerWord(wordId, false)}
      />
    );
  };

  return (
    <div>
      <header className={styles.header}>
        <Button
          variant="ghost"
          color="tertiary"
          className={styles.backButton}
          startIcon={<BiArrowBack />}
          aria-label={`학습 중단 확인: N${level} Unit ${unit}`}
          onClick={() => {
            setModalType("stop");
            pauseTimer();
          }}
        >
          <Typography as="span" variant="h5" color="inherit">
            N{level} Unit{unit}
          </Typography>
        </Button>
      </header>
      <main>
        <section className={styles.time}>
          <Typography as="p" variant="body" align="center">
            현재 학습 중: {time}
          </Typography>
        </section>
        <section className={styles.wordContent}>{renderWordContent()}</section>
      </main>
      <StudyModals
        modalType={modalType}
        level={level}
        reviewCount={reviewCountMap?.[level]?.[unit]}
        seconds={seconds}
        onCloseStop={closeModal}
        onExit={exitStudy}
        onRepeat={repeatStudy}
        onComplete={completeStudy}
      />
    </div>
  );
};

export default WordPage;
