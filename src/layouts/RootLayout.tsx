import { FaGithub } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { FeedbackModal, Stack, Typography } from "@/components";
import styles from "@/layouts/RootLayout.module.css";
import studyModalStyles from "@/pages/Word/components/StudyModals.module.css";
import { useModalStore } from "@/store/useModalStore.ts";
import { formatTime } from "@/utils";

export const RootLayout = () => {
  const { open, close, payload } = useModalStore(
    useShallow((state) => ({
      open: state.open,
      close: state.close,
      payload: state.payload,
    }))
  );

  return (
    <div className={styles.layout}>
      <div className={styles.intro}>
        <Stack justify="center" gap={30} style={{ height: "100%" }}>
          <Stack>
            <Typography as="h1" variant="h2" color="inherit">
              다독다독
            </Typography>
            <Typography as="h4" variant="h4" color="inherit">
              JLPT 단어, 반복 회독으로 자연스럽게 학습하자!
            </Typography>
          </Stack>
          <Stack>
            <Typography as="p" variant="body2" color="inherit" className={styles.introBody}>
              한 번 보면 금방 잊어버리던 단어들, 다독다독은 반복 회독을 통해 단어가 스며들듯
              익혀지도록 도와주는 JLPT 단어 학습 서비스입니다.
            </Typography>
            <br />
            <Typography as="p" variant="body2" color="inherit" className={styles.introBody}>
              헷갈리는 단어만 모아주는 효율적인 복습 구조와 누적 기록으로 확인할 수 있는 성장
              흐름이 당신의 꾸준함을 가볍지만 오래도록 이어줍니다.
            </Typography>
          </Stack>
          <Stack direction="horizontal" gap={8}>
            <Typography
              as="a"
              variant="body"
              target="_blank"
              href="https://github.com/yuri0411/dadokdadok"
              className={styles.githubLink}
            >
              <FaGithub /> github 바로가기
            </Typography>
          </Stack>
        </Stack>
      </div>
      <div className={styles.appFrame}>
        <div id="content-root" className={styles.contentRoot}>
          <Outlet />
          <FeedbackModal open={open} onClose={close} title="수고했어요!">
            <Stack gap={12}>
              <dl className={studyModalStyles.learningInfo}>
                <dt>레벨</dt>
                <dd>JLPT N{payload?.level}</dd>
                <dt>회독 수</dt>
                <dd>{payload?.reviewCount || 0}회</dd>
                <dt>학습 시간</dt>
                <dd>{formatTime(payload?.seconds ?? 0)}</dd>
              </dl>
              <Typography as="p" align="center">
                지금의 노력이 내일의 실력이 됩니다.
                <br />
                오늘 배운 단어들이 점점 익숙해질 거예요.
              </Typography>
            </Stack>
          </FeedbackModal>
        </div>
      </div>
    </div>
  );
};
