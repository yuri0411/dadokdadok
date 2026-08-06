# Skeleton

## 목적

데이터 로딩 중 레이아웃 자리를 미리 보여 줄 때 사용한다.

영역 전체가 비거나 스피너만 단독으로 뜨는 대신, 실제 UI 형태에 가까운 placeholder를 제공한다.

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `width` | `number` \| `string` | `100%` | 너비 |
| `height` | `number` \| `string` | `16` | 높이 |
| `radius` | `sm` \| `md` \| `lg` \| `full` | `md` | 모서리 |

---

## 규칙

- 목록/카드 로딩에는 페이지별 스켈레톤 조합을 사용한다.
- 버튼 내부 로딩에는 사용하지 않는다. `Button loading`을 사용한다.
- 색상은 토큰 기반 shimmer를 유지하고 hard-coded 색을 추가하지 않는다.

---

## Files

- Component: `src/components/Skeleton/Skeleton.tsx`
- Style: `src/components/Skeleton/Skeleton.module.css`
- Story: `src/components/Skeleton/Skeleton.stories.tsx`
