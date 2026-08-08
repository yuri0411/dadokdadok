import { FaGithub } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { FeedbackModal, Stack, Typography } from "@/components";
import styles from "@/layouts/RootLayout.module.css";
import studyModalStyles from "@/pages/Word/components/StudyModals.module.css";
import { useModalStore } from "@/store/useModalStore.ts";
import { formatTime } from "@/utils";

const INTRO_FEATURES = [
  "JLPT N5부터 N1까지 단원별 단어 학습",
  "외웠어요 · 다시 볼래요로 이어지는 회독",
  "복습할 단어와 학습 시간을 기기에 저장",
] as const;

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
      <aside className={styles.intro}>
        <div className={styles.introInner}>
          <Stack gap="var(--spacing-8)">
            <Stack gap="var(--spacing-3)">
              <Typography as="p" variant="overline" className={styles.introEyebrow}>
                JLPT Vocabulary Review
              </Typography>
              <Typography as="h1" variant="headline" className={styles.introBrand}>
                다독다독
              </Typography>
              <Typography as="p" variant="h4" className={styles.introHeadline}>
                일본어 단어를
                <br />
                반복해서 익히는 회독 앱
              </Typography>
              <Typography as="p" variant="body2" className={styles.introBody}>
                한 번 보고 잊히던 단어를, 단원 학습과 복습 루프로 다시 붙잡아 줍니다. 많이 읽고
                여러 번 다시 본다는 이름처럼, 꾸준한 회독에 맞춰져 있습니다.
              </Typography>
            </Stack>

            <ul className={styles.featureList}>
              {INTRO_FEATURES.map((feature) => (
                <li key={feature} className={styles.featureItem}>
                  <span className={styles.featureMark} aria-hidden="true" />
                  <Typography as="span" variant="body2" className={styles.featureText}>
                    {feature}
                  </Typography>
                </li>
              ))}
            </ul>

            <a
              className={styles.githubLink}
              href="https://github.com/yuri0411/dadokdadok"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={16} aria-hidden="true" />
              GitHub에서 보기
            </a>
          </Stack>
        </div>
      </aside>

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
