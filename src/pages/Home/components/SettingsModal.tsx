import { useState } from "react";

import { Stack, Typography } from "@/components";
import { Modal } from "@/components/Modal/Modal";
import { WORD_COUNT_OPTIONS, type WordCountOption } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore.ts";
import { useStudyStore } from "@/store/useStudyStore.ts";
import { useWordProgressStore } from "@/store/useWordProgressStore.ts";
import { cls } from "@/utils";

import styles from "./SettingsModal.module.css";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
  const wordsPerUnit = useSettingsStore((state) => state.wordsPerUnit);
  const setWordsPerUnit = useSettingsStore((state) => state.setWordsPerUnit);
  const resetStudyInfo = useStudyStore((state) => state.resetStudyInfo);
  const resetWordProgress = useWordProgressStore((state) => state.resetWordProgress);
  const [selected, setSelected] = useState<WordCountOption>(wordsPerUnit);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!open) return null;

  const saveAndReset = () => {
    resetStudyInfo();
    resetWordProgress();
    setWordsPerUnit(selected);
    setConfirmOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        open={open && !confirmOpen}
        title="설정"
        closeText="취소"
        confirmText="저장"
        onClose={onClose}
        onConfirm={() => {
          if (selected === wordsPerUnit) {
            onClose();
            return;
          }
          setConfirmOpen(true);
        }}
      >
        <Stack gap="var(--spacing-4)">
          <Stack gap="var(--spacing-1)">
            <Typography as="p" variant="h6" align="center">
              하루에 외울 단어 수
            </Typography>
            <Typography as="p" variant="body" color="tertiary" align="center">
              선택한 개수만큼 한 단원(Unit)이 구성됩니다.
            </Typography>
          </Stack>

          <div className={styles.options} role="radiogroup" aria-label="하루에 외울 단어 수">
            {WORD_COUNT_OPTIONS.map((option) => {
              const isSelected = selected === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={cls(styles.option, { [styles.optionSelected]: isSelected })}
                  onClick={() => setSelected(option)}
                >
                  {option}개
                </button>
              );
            })}
          </div>
        </Stack>
      </Modal>

      <Modal
        open={confirmOpen}
        title="학습 기록을 초기화할까요?"
        closeText="취소"
        confirmText="초기화하고 저장"
        onClose={() => setConfirmOpen(false)}
        onConfirm={saveAndReset}
      >
        <Typography as="p" variant="body" color="tertiary" align="center">
          단원당 단어 수를 바꾸면 마지막 학습 위치, 회독 수, 단원별 학습 기록이 모두
          초기화됩니다.
          <br />
          누적 학습 시간은 유지됩니다.
        </Typography>
      </Modal>
    </>
  );
};
