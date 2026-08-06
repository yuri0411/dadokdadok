# Tag

## 목적

짧은 상태·분류·횟수 정보를 라벨로 보여줄 때 사용한다.

예: `2 회독`, 레벨 보조 표시

클릭 가능한 필터/칩이 필요하면 Tag를 확장하지 말고 별도 Chip/Filter 컴포넌트를 검토한다.

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `label` | `string` | - | 표시 텍스트 (필수) |
| `color` | `default` \| `primary` \| `secondary` \| `tertiary` \| `disabled` | `secondary` | 색상 |
| `size` | `sm` \| `md` \| `lg` \| `xl` | `sm` | 크기 |

---

## Color

| color | 사용 |
|---|---|
| `primary` | 강조가 필요한 상태 |
| `secondary` | 기본 상태 라벨 |
| `tertiary` | 덜 강조된 보조 정보 |
| `disabled` | 비활성/비가용 상태 표현 |
| `default` | 중립 톤 |

---

## 규칙

- 문장형 긴 텍스트에 사용하지 않는다. 짧은 라벨만 넣는다.
- Tag를 버튼처럼 클릭 가능하게 만들지 않는다.
- 회독 수처럼 반복되는 메타 정보에 우선 사용한다.
- 카드/리스트 아이템 안에서 `Typography` 본문과 역할을 섞지 않는다.

---

## 사용 예시

```tsx
import { Tag } from "@/components";

<Tag label={`${reviewCount} 회독`} />
<Tag label="진행 중" color="primary" />
```

---

## Figma mapping

| Figma property | React prop |
|---|---|
| Label | `label` |
| Primary | `color="primary"` |
| Secondary | `color="secondary"` |
| Tertiary | `color="tertiary"` |
| Small | `size="sm"` |
| Medium | `size="md"` |

---

## Files

- Component: `src/components/Tag/Tag.tsx`
- Style: `src/components/Tag/Tag.module.css`
- Story: `src/components/Tag/Tag.stories.tsx`
