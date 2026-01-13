import { Stack, Typography } from "@/components";
import { FaCheck } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import styles from "./word.module.css";

const WordPage = () => {
  return (
    <main>
      <section className={styles.time}>
        <Typography as="p" align="center">
          현재 학습 중 : 11분 52 초
        </Typography>
      </section>
      <section>
        <div>
          <Typography as="p">1 / 50</Typography>
          <Stack direction="horizontal" align="center">
            <Typography as="p">けわしい</Typography>
            <Typography as="p">険しい</Typography>
            <Typography as="p">험하다</Typography>
          </Stack>
          <Stack align="center">
            <button>ふりがな</button>
            <button>韓国語</button>
          </Stack>
          <Stack align="center">
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
