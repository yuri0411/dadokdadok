# ErrorFallback

## 목적

API 실패나 표시할 데이터가 없을 때, 빈 화면 대신 안내와 재시도 액션을 보여줄 때 사용한다.

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `title` | `string` | `"불러오지 못했어요"` | 제목 |
| `description` | `string` | `"잠시 후 다시 시도해 주세요."` | 설명 |
| `onRetry` | `() => void` | - | 재시도 핸들러 |
| `retryLabel` | `string` | `"다시 시도"` | 버튼 라벨 |

---

## 규칙

- 쿼리 `isError` 또는 빈 결과로 화면을 구성할 수 없을 때 사용한다.
- 재시도는 가능하면 해당 query의 `refetch`에 연결한다.
- 로딩 중에는 `ErrorFallback` 대신 Skeleton을 사용한다.

---

## Files

- Component: `src/components/ErrorFallback/ErrorFallback.tsx`
- Style: `src/components/ErrorFallback/ErrorFallback.module.css`
- Story: `src/components/ErrorFallback/ErrorFallback.stories.tsx`
