# Stack

## 목적

요소를 가로/세로로 정렬하고 간격을 줄 때 사용하는 레이아웃 유틸이다.

단순 flex 컨테이너를 매번 CSS로 만들지 않도록 한다.

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `as` | ElementType | `div` | 렌더링할 HTML 요소 |
| `direction` | `horizontal` \| `vertical` | `vertical` | 배치 방향 |
| `justify` | CSS `justifyContent` | - | 주축 정렬 |
| `align` | CSS `alignItems` | - | 교차축 정렬 |
| `wrap` | CSS `flexWrap` | - | 줄바꿈 |
| `gap` | CSS `gap` | - | 간격 |
| `inline` | `boolean` | `false` | `inline-flex` 여부 |

---

## 규칙

- 간격은 가능하면 spacing 토큰을 사용한다.
  - 예: `gap="var(--spacing-3)"`
- 임시로 숫자 px을 쓰는 기존 코드가 있어도, 새로 작성할 때는 토큰을 우선한다.
- 시맨틱 구조가 필요하면 `as="main" | "section" | "ul"` 등을 사용한다.
- 복잡한 그리드/절대 위치 레이아웃을 Stack으로 억지 구현하지 않는다.

---

## 사용 예시

```tsx
import { Stack, Typography, Tag } from "@/components";

<Stack gap="var(--spacing-2)">
  <Typography as="h5" variant="h5">
    Unit 1
  </Typography>
  <Tag label="2 회독" />
</Stack>

<Stack direction="horizontal" justify="space-between" align="center" gap="var(--spacing-3)">
  ...
</Stack>
```

---

## Figma mapping

| Figma Auto Layout | React prop |
|---|---|
| Vertical | `direction="vertical"` |
| Horizontal | `direction="horizontal"` |
| Gap | `gap` |
| Align | `align` |
| Justify / Space between | `justify` |

---

## Files

- Component: `src/components/Stack/Stack.tsx`
- Story: `src/components/Stack/Stack.stories.tsx`
