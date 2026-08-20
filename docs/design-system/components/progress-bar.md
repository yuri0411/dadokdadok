# ProgressBar

## 목적

학습 진행률처럼 현재 값과 목표 값의 비율을 보여줄 때 사용한다.

예: 레벨별 완료 단어 수 / 전체 단어 수

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `value` | `number` | - | 현재 값 |
| `max` | `number` | - | 최대 값 |
| `showLabel` | `boolean` | `true` | `value / max` 라벨 표시 |
| `color` | `"default" \| "strong"` | `"default"` | 진행 바 트랙의 대비 수준 |
| `aria-label` | `string` | `"학습 진행률"` | 접근성 라벨 |

`value`는 0 ~ `max` 범위로 clamp된다. `max`가 0 이하면 1로 보정한다.

---

## 규칙

- 진행률이 아닌 단순 장식 바에 사용하지 않는다.
- 라벨 텍스트를 바깥에서 다시 만들지 말고, 필요 없으면 `showLabel={false}`로 숨긴다.
- 부모 너비에 맞춰 늘어나므로 레이아웃 폭은 감싸는 컨테이너에서 제어한다.
- 그라데이션처럼 대비가 낮은 배경 위에서는 `color="strong"`을 사용한다.
- 로딩 스피너가 필요하면 `ProgressBar`가 아니라 `CircularLoader` 또는 `Button loading`을 사용한다.

---

## 사용 예시

```tsx
import { ProgressBar } from "@/components";

<ProgressBar value={current} max={total} />
<ProgressBar value={current} max={total} color="strong" />
<ProgressBar value={0} max={50} showLabel={false} />
```

---

## Figma mapping

| Figma property | React prop |
|---|---|
| Current value | `value` |
| Max value | `max` |
| Show label | `showLabel` |
| Color | `color` |

---

## Files

- Component: `src/components/ProgressBar/ProgressBar.tsx`
- Style: `src/components/ProgressBar/ProgressBar.module.css`
- Story: `src/components/ProgressBar/ProgressBar.stories.tsx`
