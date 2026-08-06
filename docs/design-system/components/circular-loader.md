# CircularLoader

## 목적

데이터 로딩처럼 버튼 외부 영역의 대기 상태를 원형 스피너로 보여줄 때 사용한다.

버튼 내부의 제출/저장 대기에는 `Button`의 `loading`을 사용한다.

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `color` | `primary` \| `secondary` | `primary` | 색상 |
| `size` | `sm` \| `md` \| `lg` \| `xl` | `md` | 크기 |
| `strokeWidth` | `number` | `4` | 선 두께 |
| `aria-label` | `string` | `"로딩 중"` | 접근성 라벨 |

크기 매핑: `sm=30`, `md=40`, `lg=50`, `xl=60`

---

## 규칙

- 페이지/카드/리스트 로딩에 사용한다.
- 버튼 안에서는 사용하지 않는다.
- 의미가 있는 로딩이면 `aria-label`을 구체화한다.
  - 예: `"단어 불러오는 중"`
- 진행률 수치가 있으면 `CircularLoader` 대신 `ProgressBar`를 사용한다.

---

## 사용 예시

```tsx
import { CircularLoader } from "@/components";

{isLoading && <CircularLoader />}
{isLoading && <CircularLoader size="sm" aria-label="유닛 불러오는 중" />}
```

---

## Figma mapping

| Figma property | React prop |
|---|---|
| Primary | `color="primary"` |
| Secondary | `color="secondary"` |
| Small / Medium / Large / XL | `size` |
| Stroke | `strokeWidth` |

---

## Files

- Component: `src/components/CircularLoader/CircularLoader.tsx`
- Style: `src/components/CircularLoader/CircularLoader.module.css`
- Story: `src/components/CircularLoader/CircularLoader.stories.tsx`
