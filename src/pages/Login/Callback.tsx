import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, CircularLoader, Stack, Typography } from "@/components";
import { PATHS } from "@/routes/paths";
import { completeSignIn } from "@/services/auth/api";

import styles from "./index.module.css";

export default function LoginCallback() {
  const navigate = useNavigate();
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const code = params.get("code");
    // Remove credentials and provider error details from browser history immediately.
    window.history.replaceState(window.history.state, "", PATHS.AUTH_CALLBACK);
    const exchange =
      !params.has("error") && code
        ? completeSignIn(code)
        : Promise.reject(new Error("Missing authorization code"));
    void exchange
      .then(() => {
        if (active) navigate(PATHS.HOME, { replace: true });
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [navigate, params]);

  return (
    <Stack as="main" gap="var(--spacing-4)" className={styles.page}>
      <Typography as="h1" variant="h3">
        로그인 {failed ? "확인이 필요해요" : "중이에요"}
      </Typography>
      {failed ? (
        <>
          <Typography role="alert">
            로그인이 취소되었거나 시간이 지났어요. 다시 시도해 주세요.
          </Typography>
          <Button onClick={() => navigate(PATHS.LOGIN, { replace: true })}>다시 로그인</Button>
          <Button variant="ghost" onClick={() => navigate(PATHS.HOME, { replace: true })}>
            로그인 없이 학습하기
          </Button>
        </>
      ) : (
        <CircularLoader aria-label="로그인 완료 중" />
      )}
    </Stack>
  );
}
