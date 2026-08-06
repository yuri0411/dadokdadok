# FeedbackModal

## 목적

확인 버튼 없이, 짧은 완료/피드백 메시지를 보여준 뒤 자동으로 닫을 때 사용한다.

예: 학습 세션 종료 후 `"수고했어요!"` 피드백

선택이 필요하면 `Modal`을 사용한다.

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `open` | `boolean` | - | 표시 여부 |
| `title` | `string` | - | 상단 제목 |
| `children` | `ReactNode` | - | 본문 콘텐츠 |
| `durationMs` | `number` | `3000` | 자동 닫힘 시간 |
| `onClose` | `() => void` | - | 닫힐 때 호출 |
| `closeOnBackdrop` | `boolean` | `true` | 배경 클릭으로 닫기 |

`role="status"` + `aria-live="polite"`로 렌더링된다.

---

## 규칙

- 확인/취소 선택이 필요한 흐름에는 사용하지 않는다.
- 기본 노출 시간은 3초다. 더 긴 내용이 필요하면 본문을 줄이거나 `Modal`로 바꾼다.
- 액션 버튼을 내부에 추가하지 않는다.
- `useModalStore` 등 전역 상태와 함께 쓸 때 `onClose`에서 open 상태를 반드시 정리한다.

---

## 사용 예시

```tsx
import { FeedbackModal, Stack, Typography } from "@/components";

<FeedbackModal open={open} onClose={close} title="수고했어요!">
  <Stack gap={12}>
    <Typography as="p" align="center">
      오늘 학습이 저장되었습니다.
    </Typography>
  </Stack>
</FeedbackModal>
```

---

## Figma mapping

| Figma property | React prop |
|---|---|
| Open / Close | `open` |
| Title | `title` |
| Auto dismiss duration | `durationMs` |
| Dismiss on overlay | `closeOnBackdrop` |

---

## Files

- Component: `src/components/Modal/FeedbackModal.tsx`
- Style: `src/components/Modal/Modal.module.css`
- Related: [modal.md](./modal.md)
