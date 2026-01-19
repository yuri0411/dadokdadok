import { FaGithub } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";
import { Outlet } from "react-router-dom";

import { Stack, Typography } from "@/components";

const RootLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        backgroundColor: "#00B894",
      }}
    >
      <Stack justify="center" gap={30} style={{ width: "36rem", padding: 20, color: "white" }}>
        <Stack>
          <Typography as="h1" variant="h2" color="inherit">
            다독다독
          </Typography>
          <Typography as="h4" variant="h4" color="inherit">
            JLPT 단어, 반복 회독으로 자연스럽게 학습하자!
          </Typography>
        </Stack>
        <Stack>
          <Typography as="p" variant="body2" color="inherit" style={{ wordBreak: "keep-all" }}>
            한 번 보면 금방 잊어버리던 단어들, 다독다독은 반복 회독을 통해 단어가 스며들듯
            익혀지도록 도와주는 JLPT 단어 학습 서비스입니다.
          </Typography>
          <br />
          <Typography as="p" variant="body2" color="inherit" style={{ wordBreak: "keep-all" }}>
            헷갈리는 단어만 모아주는 효율적인 복습 구조와 누적 기록으로 확인할 수 있는 성장 흐름이
            당신의 꾸준함을 가볍지만 오래도록 이어줍니다.
          </Typography>
        </Stack>
        <Stack direction="horizontal" gap={8}>
          <Typography
            as="a"
            target="_blank"
            href="https://yuri-archive.notion.site/2b13058aa1588089b52fe169bf0c3969"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
              background: "white",
              padding: "12px 16px",
              borderRadius: "50px",
            }}
          >
            <LuExternalLink />
            개발 과정 자세히 보기
          </Typography>
          <Typography
            as="a"
            variant="body"
            target="_blank"
            href="https://github.com/yuri0411/dadokdadok"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
              background: "white",
              padding: "8px 16px",
              borderRadius: "50px",
            }}
          >
            <FaGithub /> github 바로가기
          </Typography>
        </Stack>
      </Stack>
      <div
        style={{
          width: "30rem",
          height: "100%",
          overflowY: "scroll",
          background: "white",
          boxShadow: "0 0 18px rgba(0,0,0,0.3)",
        }}
      >
        <div id="content-root" style={{ position: "relative", height: "100%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
