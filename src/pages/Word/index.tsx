import { useMemo, useState } from "react";

import { isEmpty } from "lodash-es";
import { BiArrowBack } from "react-icons/bi";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { ErrorFallback, Typography } from "@/components";
import { LIMIT } from "@/constants";
import { useTimer } from "@/hooks/useTimer.ts";
import { StudyModals } from "@/pages/Word/components/StudyModals.tsx";
import { useRandomWordsQuery, useWordsPerUnitQuery } from "@/services/word/queries.ts";
import { useModalStore } from "@/store/useModalStore.ts";
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

  return <WordPageInner unit={unit} level={level} />;
};
const WordPageInner = ({ unit, level }: { unit: string; level: string }) => {
  const navigate = useNavigate();

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

  const { repeatWords = [], learnedWords = [] } = getWordProgressByUnit(level, unit);

  const { seconds, time, pause: pauseTimer, resume: resumeTimer } = useTimer();

  const [repeatWordIds, setRepeatWordIds] = useState<number[]>(repeatWords);
  const [learnedWordIds, setLearnedWordIds] = useState<number[]>(learnedWords);

  const usesRandomWords =
    !isEmpty(repeatWords) && repeatWords.length + learnedWords.length >= LIMIT;

  const { data = [], isPending, isError, refetch } = useWordsPerUnitQuery(level, LIMIT, Number(unit));
  const {
    data: randomWords = [],
    isPending: isPendingRandomWords,
    isError: isErrorRandomWords,
    refetch: refetchRandomWords,
  } = useRandomWordsQuery(usesRandomWords ? repeatWordIds : []);

  const [currentCount, setCurrentCount] = useState(0);
  const [modalType, setModalType] = useState<"stop" | "repeat" | "complete">();

  const openGlobalModal = useModalStore((s) => s.openModal);

  const words = useMemo(() => {
    if (usesRandomWords) {
      return randomWords;
    }

    return data.filter(
      (word) =>
        ![...(learnedWords.length === LIMIT ? [] : learnedWords), ...repeatWords].includes(word.id)
    );
  }, [data, learnedWords, randomWords, repeatWords, usesRandomWords]);

  const isLoading = usesRandomWords ? isPendingRandomWords : isPending;
  const isQueryError = usesRandomWords ? isErrorRandomWords : isError;
  const currentWord = words[currentCount];

  const exitStudy = () => {
    setSeconds({ level, seconds });
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
    refetchRandomWords().then(() => {
      setCurrentCount(0);
      setWordProgress({ learnedWordIds, repeatWordIds, level, unit });
      closeModal();
    });
  };

  const completeStudy = () => {
    refetch().then(() => {
      setCurrentCount(0);
      setWordProgressReset(level, unit);
      setRepeatWordIds([]);
      setLearnedWordIds([]);
      closeModal();
    });
  };

  const goNext = () => {
    if (currentCount < words.length - 1) {
      setCurrentCount((prevCount) => prevCount + 1);
      return;
    }
    pauseTimer();
    if (repeatWordIds.length <= 1) {
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
        onRepeatClick={(wordId: number) => {
          setRepeatWordIds((ids) => [...new Set([...ids, wordId])]);
          setLearnedWordIds((ids) => ids.filter((id) => id !== wordId));
          goNext();
        }}
        onLearnedClick={(wordId: number) => {
          setRepeatWordIds((ids) => ids.filter((id) => id !== wordId));
          setLearnedWordIds((ids) => [...new Set([...ids, wordId])]);
          goNext();
        }}
      />
    );
  };

  return (
    <div>
      <header style={{ padding: "16px 20px" }}>
        <Typography
          as="a"
          variant="h5"
          onClick={() => {
            setModalType("stop");
            pauseTimer();
          }}
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
        <section style={{ padding: 20 }}>{renderWordContent()}</section>
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
