# Typography

## 목적

제목, 본문, 보조 텍스트의 계층을 통일할 때 사용한다.

임의 `font-size` / `font-weight`를 페이지에 직접 쓰지 않고 Typography variant로 표현한다.

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `as` | ElementType | `p` | 렌더링할 HTML 요소 |
| `variant` | `headline` \| `h2` \| `h3` \| `h4` \| `h5` \| `h6` \| `body` \| `body2` \| `caption` \| `overline` | `body` | 시각적 스타일 |
| `color` | `default` \| `primary` \| `secondary` \| `tertiary` \| `disabled` \| `inherit` | `default` | 텍스트 색 |
| `align` | CSS `textAlign` | `left` | 정렬 |

---

## Variant

| variant | 사용 |
|---|---|
| `headline` | 가장 큰 강조 텍스트, 404 숫자 등 |
| `h2` | 페이지 주요 제목 |
| `h3` | 모달 제목, 섹션보다 큰 제목 |
| `h4` | 섹션 제목 |
| `h5` | 카드 제목 |
| `h6` | 작은 섹션/그룹 제목 |
| `body2` | 조금 더 큰 본문 |
| `body` | 기본 본문 |
| `caption` | 부가 설명 |
| `overline` | 메타 정보, 진행률 라벨, 작은 상태 텍스트 |

시각적 variant와 시맨틱 태그(`as`)는 분리한다.

예: 카드 제목이 h5 크기여도 문서 구조상 `as="h4"`가 맞으면 `as`를 우선한다.

---

## Color

| color | 사용 |
|---|---|
| `default` | 기본 본문/제목 |
| `primary` | 강조 텍스트 |
| `secondary` | 보조 강조 |
| `tertiary` | 설명, 메타 정보 |
| `disabled` | 비활성 텍스트 |
| `inherit` | 부모 색을 그대로 따름 (다크 배너 등) |

---

## 규칙

- 텍스트 스타일을 CSS에서 새로 정의하기 전에 Typography variant로 가능한지 확인한다.
- 긴 본문은 `body` / `body2`를 쓰고, 메타 정보는 `overline` / `caption`을 쓴다.
- 색만 바꾸려고 `style={{ color: ... }}`를 쓰지 말고 `color` prop을 사용한다.
- 정렬은 `align` prop을 사용한다.

---

## 사용 예시

```tsx
import { Typography } from "@/components";

<Typography as="h1" variant="h2">
  다독다독
</Typography>

<Typography as="p" variant="body" color="tertiary">
  반복 학습으로 단어를 기억해요.
</Typography>
```

---

## Figma mapping

| Figma text style | React prop |
|---|---|
| Headline | `variant="headline"` |
| Heading 2 | `variant="h2"` |
| Heading 3 | `variant="h3"` |
| Body | `variant="body"` |
| Body Large | `variant="body2"` |
| Caption | `variant="caption"` |
| Overline | `variant="overline"` |
| Primary / Secondary / Tertiary | `color` |

---

## Files

- Component: `src/components/Typography/Typography.tsx`
- Style: `src/components/Typography/Typography.module.css`
- Theme map: `src/styles/theme.ts`
- Story: `src/components/Typography/Typography.stories.tsx`
