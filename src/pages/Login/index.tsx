import { SiKakaotalk, SiNaver } from "react-icons/si";
import { useNavigate } from "react-router-dom";

import { Button, CircularLoader, Stack, Typography } from "@/components";
import { PATHS } from "@/routes/paths";
import { isAuthConfigured } from "@/services/auth/api";
import { useAuthUser, useSignIn, useSignOut } from "@/services/auth/queries";

import styles from "./index.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useAuthUser();
  const login = useSignIn();
  const logout = useSignOut();

  return (
    <Stack as="main" gap="var(--spacing-6)" className={styles.page}>
      <Stack gap="var(--spacing-2)">
        <Typography as="h1" variant="h2">
          {user.data ? "내 계정" : "다독다독 로그인"}
        </Typography>
        <Typography color="tertiary">카카오 또는 네이버 계정으로 간편하게 시작하세요.</Typography>
      </Stack>
      {user.isPending ? (
        <CircularLoader aria-label="로그인 상태 확인 중" />
      ) : user.data ? (
        <Stack gap="var(--spacing-3)">
          <Typography role="status">로그인되어 있어요.</Typography>
          <Button
            variant="outlined"
            color="tertiary"
            loading={logout.isPending}
            loadingText="로그아웃 중"
            onClick={() => logout.mutate()}
          >
            로그아웃
          </Button>
        </Stack>
      ) : (
        <Stack gap="var(--spacing-3)">
          {!isAuthConfigured && (
            <Typography role="status">
              로그인을 준비하고 있어요. 지금은 로그인 없이 학습할 수 있어요.
            </Typography>
          )}
          <Button
            size="lg"
            width="100%"
            className={styles.kakao}
            startIcon={<SiKakaotalk />}
            disabled={!isAuthConfigured || login.isPending}
            loading={login.isPending && login.variables === "kakao"}
            loadingText="카카오로 이동 중"
            onClick={() => login.mutate("kakao")}
          >
            카카오로 로그인
          </Button>
          <Button
            size="lg"
            width="100%"
            className={styles.naver}
            variant="outlined"
            color="tertiary"
            startIcon={<SiNaver />}
            disabled={!isAuthConfigured || login.isPending}
            loading={login.isPending && login.variables === "naver"}
            loadingText="네이버로 이동 중"
            onClick={() => login.mutate("naver")}
          >
            네이버로 로그인
          </Button>
        </Stack>
      )}
      {(login.isError || logout.isError || user.isError) && (
        <Typography role="alert">
          로그인 상태를 변경하지 못했어요. 잠시 후 다시 시도해 주세요.
        </Typography>
      )}
      <Typography variant="caption" color="tertiary">
        학습 기록은 현재 브라우저에 저장돼요. 로그인해도 다른 기기와 자동으로 동기화되지 않아요.
      </Typography>
      <Button variant="ghost" color="tertiary" onClick={() => navigate(PATHS.HOME)}>
        {user.data ? "학습하러 가기" : "로그인 없이 학습하기"}
      </Button>
    </Stack>
  );
}
