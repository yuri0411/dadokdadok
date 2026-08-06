# Project Instructions

다독다독(dadokdadok) 작업 전에 아래 공통 문서를 읽고 따른다.
규칙 전체를 이 파일에 복사하지 말고, 항상 원문을 기준으로 한다.

## 필수 문서

- `docs/ai/architecture.md`
- `docs/ai/coding-guidelines.md`
- `docs/ai/workflow.md`

## UI 작업 시 추가 문서

- `docs/ai/component-guidelines.md`
- `docs/design-system/tokens.md`
- `docs/design-system/component-guidelines.md`
- 관련 `docs/design-system/components/*.md`
- 기존 Storybook stories (`src/components/**/*.stories.tsx`)

## 강제 사항

- 기존 공통 컴포넌트를 재사용한 뒤, 없을 때만 새로 만든다.
- 디자인 토큰이 있으면 hard-coded 시각 값을 추가하지 않는다.
- 새 컴포넌트 variant는 다음 순서를 지킨다.
  1. 타입 업데이트
  2. 토큰 기반 스타일 구현
  3. Storybook story 추가/수정
  4. 사용 규칙 문서 갱신
  5. 접근성 상태 확인
- 패키지 매니저는 `yarn`을 사용한다.
- 요청 범위를 넘는 리팩터링을 하지 않는다.

## 검증

```bash
yarn lint
yarn build
```

Storybook 변경이 있으면:

```bash
yarn build-storybook
```
