# Button

## 목적

사용자가 즉시 실행할 수 있는 액션에 사용한다.

예: 홈으로 이동, 학습 시작, 모달 확인/취소, 저장

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `variant` | `filled` \| `outlined` \| `ghost` | `filled` | 시각적 스타일 |
| `color` | `default` \| `primary` \| `secondary` \| `tertiary` \| `disabled` | `primary` | 의미/강조색 |
| `size` | `sm` \| `md` \| `lg` \| `xl` | `md` | 크기 |
| `startIcon` | `ReactNode` | - | 텍스트 앞 아이콘 |
| `endIcon` | `ReactNode` | - | 텍스트 뒤 아이콘 |
| `loading` | `boolean` | `false` | 비동기 처리 중 상태 |
| `loadingText` | `string` | `"처리 중"` | loading 시 표시 텍스트 |
| `width` | `number` \| `string` | - | 고정 너비 또는 `100%` |
| `disabled` | `boolean` | `false` | 비활성 상태 |
| `icon` | `ReactNode` | - | deprecated. `endIcon` 사용 |

기본 HTML button 속성(`type`, `onClick`, `aria-*` 등)도 전달할 수 있다.

---

## Variant

### filled

화면에서 가장 중요한 액션에 사용한다.

한 화면 또는 한 영역 안에서 filled + primary 조합을 여러 개 두지 않는다.

### outlined

primary보다 우선순위가 낮은 보조 액션에 사용한다.

모달의 취소 버튼처럼 확인 액션과 함께 쓸 때 `variant="outlined"` + `color="tertiary"`를 기본으로 한다.

### ghost

툴바, 텍스트형 보조 동작, 시각적 비중을 낮춰야 하는 액션에 사용한다.

---

## Color

| color | 사용 |
|---|---|
| `primary` | 핵심 액션 |
| `secondary` | primary보다 약한 강조 |
| `tertiary` | 보조/중립 액션 |
| `default` | 기본 텍스트 톤이 필요한 경우 |
| `disabled` | 시각적으로 비활성처럼 보여야 할 때. 실제 클릭 차단은 `disabled` prop 사용 |

---

## Size

| size | 사용 |
|---|---|
| `sm` | 좁은 영역, 보조 UI |
| `md` | 기본값. 대부분의 화면 액션 |
| `lg` | 주요 CTA를 더 크게 보여줄 때 |
| `xl` | 랜딩/강조 영역 |

---

## 규칙

- 링크 이동이 목적이고 버튼 스타일이 필요 없으면 `Button` 대신 라우터 `Link`/`NavLink`를 사용한다.
- 비동기 요청 중에는 `loading`을 사용한다. `disabled`만 켜서 로딩을 표현하지 않는다.
- 아이콘은 `startIcon` / `endIcon`으로 전달한다. `icon` prop은 더 이상 쓰지 않는다.
- 직접 `<button>`을 작성하지 않고 공통 `Button`을 사용한다.
- 긴 라벨이 필요하면 `width`로 영역을 제한하고 Storybook의 LongText 상태를 참고한다.
- 모바일 full-width CTA는 `width="100%"`를 사용한다.

---

## 사용 예시

```tsx
import { Button } from "@/components";

<Button onClick={onSave}>저장</Button>

<Button variant="outlined" color="tertiary" onClick={onCancel}>
  취소
</Button>

<Button loading loadingText="저장 중" onClick={onSave}>
  저장
</Button>
```

---

## Figma mapping

| Figma property | React prop |
|---|---|
| Filled | `variant="filled"` |
| Outlined | `variant="outlined"` |
| Ghost | `variant="ghost"` |
| Primary | `color="primary"` |
| Secondary | `color="secondary"` |
| Tertiary | `color="tertiary"` |
| Small | `size="sm"` |
| Medium | `size="md"` |
| Large | `size="lg"` |
| Extra large | `size="xl"` |
| Disabled | `disabled` |
| Loading | `loading` |

---

## Files

- Component: `src/components/Button/Button.tsx`
- Style: `src/components/Button/Button.module.css`
- Story: `src/components/Button/Button.stories.tsx`
