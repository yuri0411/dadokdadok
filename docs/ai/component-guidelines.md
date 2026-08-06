# Component Guidelines (AI)

공통 컴포넌트 선택과 확장에 대한 AI 작업용 진입 문서다.

상세 규칙의 컴포넌트별 문서는 디자인 시스템 문서를 정본으로 사용한다.
여기에 규칙을 복제하지 말고, 아래 문서를 읽고 따른다.

---

## 먼저 읽을 문서

1. `docs/design-system/overview.md`
2. `docs/design-system/component-guidelines.md`
3. 작업 대상 컴포넌트의 `docs/design-system/components/*.md`
4. 해당 컴포넌트의 Storybook story (`src/components/**/*.stories.tsx`)

토큰이 필요하면 `docs/design-system/tokens.md`와 `src/styles/tokens/`를 확인한다.

---

## 빠른 선택 기준

| 상황 | 컴포넌트 |
|---|---|
| 즉시 실행 액션 | `Button` |
| 확인/취소 결정 | `Modal` |
| 자동 닫힘 피드백 | `FeedbackModal` |
| 짧은 상태 라벨 | `Tag` |
| 텍스트 계층 | `Typography` |
| 진행률 | `ProgressBar` |
| 정렬/간격 | `Stack` |
| 영역 로딩 | `CircularLoader` 또는 `Skeleton` |
| 버튼 내부 로딩 | `Button`의 `loading` |
| API 실패 안내 | `ErrorFallback` |

없는 컴포넌트가 필요하면 페이지에 임시 구현하기 전에 공통 컴포넌트 추가 여부를 먼저 제안한다.

---

## 강제 사항

- 기존 공통 컴포넌트와 같은 UI를 페이지에서 다시 만들지 않는다.
- 스타일은 디자인 토큰을 사용한다.
- 새 variant는 Storybook + 사용 규칙 문서를 함께 추가한다.
- Input 공통 컴포넌트는 아직 없다. 폼 입력이 필요하면 추가 구현을 별도 작업으로 제안한다.

---

## 관련 문서

- 아키텍처: `docs/ai/architecture.md`
- 코딩 규칙: `docs/ai/coding-guidelines.md`
- 작업 순서: `docs/ai/workflow.md`
- UI 검증 체크리스트: `docs/ai/checklists/component-review.md`
