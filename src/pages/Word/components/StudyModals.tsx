import { Stack, Typography, Modal } from "@/components";
import { formatTime } from "@/utils";
import styles from "./StudyModals.module.css";

type ModalType = "stop" | "repeat" | "complete" | undefined;
interface StudyModalsProps {
  modalType: ModalType;
  level: number;
  reviewCount: number;
  seconds: number;
  onCloseStop: () => void;
  onExit: () => void;
  onRepeat: () => void;
  onComplete: () => void;
}
export const StudyModals = ({
  modalType,
  level,
  reviewCount,
  seconds,
  onCloseStop,
  onExit,
  onRepeat,
  onComplete,
}: StudyModalsProps) => {
  if (!modalType) return null;

  if (modalType === "stop") {
    return (
      <Modal open={true} title="학습을 마치시겠어요?" onClose={onCloseStop} onConfirm={onExit}>
        진행중인 학습 내용은 모두 저장됩니다.
      </Modal>
    );
  }
  if (modalType === "repeat") {
    return (
      <Modal
        open={true}
        title="다시 볼 단어들을 무작위 순서로 모아봤어요."
        closeText="마무리하기"
        onClose={onExit}
        onConfirm={onRepeat}
        confirmText="복습 시작"
      >
        하나씩 다시 외워볼까요?
      </Modal>
    );
  }

  return (
    <Modal
      open={true}
      title="학습을 모두 마쳤어요!"
      closeText="마무리하기"
      onClose={onExit}
      onConfirm={onComplete}
      confirmText="한번 더 보기"
    >
      <Stack gap={12}>
        <dl className={styles.learningInfo}>
          <dt>레벨</dt>
          <dd>JLPT N{level}</dd>
          <dt>회독 수</dt>
          <dd>{reviewCount}회</dd>
          <dt>학습 시간</dt>
          <dd>{formatTime(seconds)}</dd>
        </dl>
        <Typography as="p">
          기억이 더 오래 남도록 이번 장을 한 번 더 돌아보는 건 어떨까요?
        </Typography>
      </Stack>
    </Modal>
  );
};
