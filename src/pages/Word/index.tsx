import { Stack, Typography } from "@/components";
import { FaBookmark, FaCheck } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import styles from "./word.module.css";

const WordPage = () => {
  return (
    <main>
      <section className={styles.time}>
        <Typography as="p" variant="body" align="center">
          현재 학습 중 : 11분 52 초
        </Typography>
      </section>
      <section style={{ padding: 20 }}>
        <div className={styles.wordCard}>
          <FaBookmark size={20} className={styles.bookmark} fill="#FF9533" />
          <div className={styles.content}>
            <Typography as="p" variant="overline" color="secondary" align="center">
              1 / 50
            </Typography>
            <Stack gap={16} align="center" className={styles.word}>
              <Typography as="p" style={{ fontSize: 24 }}>
                けわしい
              </Typography>
              <Typography as="p" variant="headline" style={{ marginTop: "-20px" }}>
                険しい
              </Typography>
              <Typography as="p" style={{ fontSize: 24 }}>
                험하다
              </Typography>
            </Stack>
            <Stack gap={8} direction="horizontal" justify="center" className={styles.toggleButton}>
              <button className={styles.active}>ふりがな</button>
              <button>韓国語</button>
            </Stack>
          </div>
          <Stack direction="horizontal" align="center" className={styles.action}>
            <button>
              <FaRepeat />
              다시볼래요
            </button>
            <button>
              <FaCheck />
              외웠어요
            </button>
          </Stack>
        </div>
      </section>
    </main>
  );
};

export default WordPage;
