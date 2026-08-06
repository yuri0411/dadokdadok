# Modal

## 목적

사용자의 확인이 필요한 중요한 결정을 막을 때 사용한다.

예: 학습 중단 확인, 복습 시작 확인, 학습 완료 후 다음 행동 선택

짧은 피드백만 보여주고 자동으로 닫혀야 하면 `FeedbackModal`을 사용한다.

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `open` | `boolean` | - | 표시 여부 |
| `title` | `string` | - | 상단 제목 |
| `children` | `ReactNode` | - | 본문 콘텐츠 |
| `closeText` | `string` | `"취소"` | 닫기/보조 버튼 라벨 |
| `confirmText` | `string` | `"확인"` | 확인/주요 버튼 라벨 |
| `onClose` | `() => void` | - | 닫기 액션 |
| `onConfirm` | `() => void` | - | 확인 액션 |
| `closeOnBackdrop` | `boolean` | `true` | 배경 클릭으로 닫기 |
| `closeOnEscape` | `boolean` | `true` | Escape로 닫기 |
| `confirmLoading` | `boolean` | `false` | 확인 버튼 loading |

`#content-root`가 있을 때만 portal로 렌더링된다.

---

## 구조

1. 제목 (`Typography` h3)
2. 본문 (`children`)
3. 액션 영역
   - 닫기: `Button variant="outlined" color="tertiary"`
   - 확인: `Button` (기본 filled + primary), `confirmLoading` 지원

---

## 규칙

- 확인과 취소처럼 선택이 필요한 대화에만 사용한다.
- 한 시점에 Modal은 하나만 연다.
- 파괴적이거나 되돌리기 어려운 액션의 확인 버튼 라벨은 동작을 명확히 쓴다.
  - 예: `"확인"`보다 `"학습 종료"`, `"복습 시작"`
- 본문은 짧게 유지한다. 긴 설명이나 통계가 필요하면 `Stack`으로 정리한다.
- 모달 안에서 임의의 footer 버튼을 새로 만들지 않는다. 액션은 `closeText` / `confirmText`로 표현한다.
- 자동 종료되는 완료 메시지는 `Modal`이 아니라 `FeedbackModal`을 사용한다.

---

## 사용 예시

```tsx
import { Modal, Typography } from "@/components";

<Modal
  open={open}
  title="학습을 마치시겠어요?"
  closeText="취소"
  confirmText="마치기"
  onClose={onClose}
  onConfirm={onExit}
>
  <Typography align="center">진행 중인 학습 내용은 모두 저장됩니다.</Typography>
</Modal>
```

---

## Figma mapping

| Figma property | React prop |
|---|---|
| Open / Close | `open` |
| Title | `title` |
| Secondary action label | `closeText` |
| Primary action label | `confirmText` |
| Confirm loading | `confirmLoading` |
| Dismiss on overlay | `closeOnBackdrop` |

---

## Files

- Component: `src/components/Modal/Modal.tsx`
- Style: `src/components/Modal/Modal.module.css`
- Story: `src/components/Modal/Modal.stories.tsx`
- Related: [feedback-modal.md](./feedback-modal.md)
