import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography } from "@/components";
import { PATHS } from "@/routes/paths";

export const NotfoundPage = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="vertical" align="center" justify="center" style={{ height: "100vh" }}>
      <Typography as="h1" variant="headline">
        404
      </Typography>
      <Typography as="p" variant="body2">
        페이지를 찾을 수 없습니다.
      </Typography>
      <Button
        onClick={() => navigate(PATHS.ROOT, { replace: true })}
        style={{
          marginTop: 20,
        }}
      >
        홈으로 이동
      </Button>
    </Stack>
  );
};
