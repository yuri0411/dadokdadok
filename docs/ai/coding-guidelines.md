# Coding Guidelines

Cursor, Claude, Codex가 공통으로 따르는 코드 작성 기준이다.

도구별 규칙 파일에 이 내용을 복사하지 않는다. 항상 이 문서를 읽고 따른다.
UI 작업 시에는 `docs/design-system/` 문서도 함께 확인한다.

---

## TypeScript

- `any`를 사용하지 않는다.
- 공개 컴포넌트의 props 타입을 명시하고 export한다.
- 도메인 의미가 분명한 값만 문자열 union으로 둔다.
  - 예: `Variant = "filled" | "outlined" | "ghost"`
- 불필요한 type assertion(`as`)을 사용하지 않는다.
- 타입 파일은 도메인 가까이에 둔다.
  - 예: `services/word/types.ts`, `styles/type.ts`

---

## Components

- 공통 UI가 있으면 HTML 요소를 직접 구현하지 않는다.
- 공통 컴포넌트는 `@/components`에서 import한다.
- 스타일 값에는 디자인 토큰을 사용한다.
- 컴포넌트 props는 Figma property / variant 이름과 대응시킨다.
- 새로운 variant·상태를 추가하면 Storybook story와 `docs/design-system/components/*.md`를 함께 갱신한다.
- 화면 전용 UI는 `pages/` 하위에 두고, 2곳 이상 반복되면 공통으로 승격한다.

상세 선택 기준은 `docs/ai/component-guidelines.md`와 `docs/design-system/component-guidelines.md`를 따른다.

---

## Styling

- 색상 HEX 값을 컴포넌트/페이지 CSS에 직접 작성하지 않는다.
- spacing, radius, shadow, motion은 정의된 토큰을 사용한다.
- 임의의 z-index 값을 사용하지 않는다.
- 스타일은 CSS Module을 기본으로 한다.
- 클래스 조합이 필요하면 `cls` 유틸을 사용한다.

```css
/* 지양 */
.button {
  color: #ffffff;
  background-color: #526fff;
  padding: 0 16px;
  border-radius: 8px;
}

/* 권장 */
.button {
  color: var(--color-text-on-primary);
  background-color: var(--color-action-primary);
  padding-inline: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

토큰 정의는 `docs/design-system/tokens.md`, 구현은 `src/styles/tokens/`를 기준으로 한다.

---

## State & Data

- 서버 데이터는 React Query로 관리한다.
- 학습 진행/회독/타이머 등 클라이언트 영속 상태는 Zustand를 사용한다.
- API 호출은 `src/lib/api.ts`의 `api` 인스턴스를 통한다.
- `services/<domain>/api.ts`와 `queries.ts`를 분리한다.
- 컴포넌트에서 axios를 직접 호출하지 않는다.

---

## Accessibility

- 버튼에는 접근 가능한 이름이 있어야 한다.
- 아이콘 전용 버튼은 `aria-label`을 제공한다.
- 로딩 표시에는 `aria-busy`, `role="status"`, `aria-label` 등을 적절히 사용한다.
- 모달은 `role="dialog"` / `aria-modal` 또는 feedback용 `role="status"` 패턴을 유지한다.
- form field를 추가할 때는 label과 연결한다.

---

## Imports & Structure

- import 순서는 ESLint `import/order` 규칙을 따른다.
- 경로는 alias(`@/`)를 우선 사용한다.
- 관련 없는 리팩터링, 문서 작성, 의존성 추가를 요청받지 않은 채 하지 않는다.
- 기존 파일의 네이밍·패턴을 먼저 맞춘다.

---

## 금지 사항

- 존재하는 공통 컴포넌트를 무시하고 같은 UI를 새로 만들기
- 디자인 토큰 대신 hard-coded 시각 값 추가하기
- Storybook/문서 없이 공통 컴포넌트 variant만 코드에 추가하기
- 서버 캐시를 Zustand에 중복 정본으로 저장하기
- `.env*` 등 비밀값을 문서나 커밋에 넣기

---

## 검증 명령

변경 후 가능한 범위에서 아래를 실행한다.

```bash
yarn lint
yarn build
```

Storybook 관련 변경이 있으면:

```bash
yarn build-storybook
```
