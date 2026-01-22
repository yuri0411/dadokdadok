import { useMemo, useState } from "react";

import { isEmpty } from "lodash-es";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { Typography } from "@/components";
import { LIMIT } from "@/constants";
import { useTimer } from "@/hooks/useTimer.ts";
import { StudyModals } from "@/pages/Word/components/StudyModals.tsx";
import { useRandomWordsQuery, useWordsPerUnitQuery } from "@/services/word/queries.ts";
import { useModalStore } from "@/store/useModalStore.ts";
import { useStudyStore } from "@/store/useStudyStore.ts";
import { useTimerStore } from "@/store/useTimerStore.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";

import WordCard from "./components/WordCard.tsx";
import styles from "./index.module.css";

const WordPage = () => {
  const { unit } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const level = location.state?.level;

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

  const { repeatWords = [], learnedWords = [] } = getWordProgressByUnit(level, unit!);

  const { seconds, time, pause: pauseTimer, resume: resumeTimer } = useTimer();

  const [repeatWordIds, setRepeatWordIds] = useState<number[]>(repeatWords);
  const [learnedWordIds, setLearnedWordIds] = useState<number[]>(learnedWords);

  const { data = [], isPending, refetch } = useWordsPerUnitQuery(level, LIMIT, Number(unit));
  const {
    data: randomWords = [],
    isPending: isPendingRandomWords,
    refetch: refetchRandomWords,
  } = useRandomWordsQuery(repeatWordIds);

  const [currentCount, setCurrentCount] = useState(0);
  const [modalType, setModalType] = useState<"stop" | "repeat" | "complete">();

  const openGlobalModal = useModalStore((s) => s.openModal);

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

  const exitStudy = () => {
    setSeconds({ level, unit: unit!, seconds });
    navigate(-1);
    setModalType(undefined);
    setWordProgress({ learnedWordIds, repeatWordIds, level, unit: unit! });
    setLastStudy(level, unit!);
    if (modalType !== "complete") {
      openGlobalModal({ level, reviewCount: reviewCountMap?.[level]?.[unit!], seconds });
    }
  };

  const closeModal = () => {
    setModalType(undefined);
    resumeTimer();
  };

  const repeatStudy = () => {
    refetchRandomWords().then(() => {
      setCurrentCount(0);
      setWordProgress({ learnedWordIds, repeatWordIds, level, unit: unit! });
      closeModal();
    });
  };

  const completeStudy = () => {
    refetch().then(() => {
      setCurrentCount(0);
      setWordProgressReset(level, unit!);
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
      setReviewCount(level, unit!);
    } else {
      setModalType("repeat");
    }
  };

  console.log(words); // TODO TEMP 디버깅용
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
        <section style={{ padding: 20 }}>
          <WordCard
            word={words[currentCount]}
            isLoading={isPending || isPendingRandomWords}
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
        </section>
      </main>
      <StudyModals
        modalType={modalType}
        level={level}
        reviewCount={reviewCountMap?.[level]?.[unit!]}
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
