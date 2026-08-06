# Architecture

다독다독(dadokdadok)은 JLPT 단어 회독 학습을 위한 React 개인 프로젝트다.

이 문서는 Cursor, Claude, Codex가 코드를 수정하기 전에 공유하는 구조 기준이다.
도구별 규칙 파일에는 내용을 복사하지 말고, 이 문서와 `docs/ai/*`, `docs/design-system/*`를 참조한다.

---

## 기술 스택

| 구분 | 기술 |
|---|---|
| UI | React 19 + TypeScript |
| Routing | React Router |
| Server state | TanStack React Query |
| Client state | Zustand (+ persist) |
| Styling | CSS Module + Design Tokens |
| Build | Vite |
| Docs / UI catalog | Storybook |

패키지 매니저는 `yarn`을 사용한다.

---

## 디렉터리 구조

```text
src/
├── components/     # 공통 UI 컴포넌트
├── pages/          # 페이지 단위 화면
├── services/       # API 호출 + React Query hooks/types
├── store/          # Zustand 전역 상태
├── hooks/          # 커스텀 훅
├── layouts/        # 공통 레이아웃
├── routes/         # 라우터, 경로 상수
├── lib/            # axios, queryClient 등 인프라
├── utils/          # 순수 유틸
├── constants/      # 공통 상수
├── styles/         # 전역 스타일, 토큰, theme
└── assets/         # 이미지 등 정적 리소스

docs/
├── ai/             # AI 공통 기준 문서 (이 폴더)
└── design-system/  # 토큰·컴포넌트 사용 규칙
```

---

## 계층 책임

### pages

화면 단위 조합과 사용자 흐름을 담당한다.

- 라우트 파라미터, 페이지 상태, 화면 전용 하위 컴포넌트를 둔다.
- 공통 UI를 여기서 새로 구현하지 않는다.

### components

재사용 UI만 둔다.

- `@/components`로 export한다.
- 스타일은 CSS Module + 디자인 토큰을 사용한다.
- Storybook story와 `docs/design-system/components/*.md`를 함께 유지한다.

### services

서버 데이터 접근을 담당한다.

```text
services/<domain>/
├── api.ts       # axios 호출
├── queries.ts   # React Query hooks
└── types.ts     # 도메인 타입
```

- HTTP 클라이언트는 `src/lib/api.ts`의 `api` 인스턴스를 사용한다.
- 서버 상태는 React Query, 학습 진행/회독 같은 클라이언트 상태는 Zustand로 분리한다.

### store

학습 진행, 타이머, 모달, 북마크처럼 클라이언트에서 유지할 상태를 둔다.

- persist가 필요하면 Zustand middleware를 사용한다.
- 서버 응답 캐시를 store에 중복 저장하지 않는다.

### styles

디자인 토큰과 타이포 유틸을 둔다.

```text
src/styles/tokens/
├── colors.css
├── spacing.css
├── typography.css
├── radius.css
├── shadow.css
├── motion.css
└── index.css
```

시각 값은 가능하면 토큰을 통해 참조한다. 자세한 규칙은 `docs/design-system/tokens.md`를 따른다.

---

## 라우팅

- 경로 상수는 `src/routes/paths.ts`에 둔다.
- 라우터 정의는 `src/routes/router.tsx`에 둔다.
- 페이지는 `lazy` + `Lazy`로 코드 스플리팅한다.
- 레이아웃은 `RootLayout`을 사용한다.

주요 흐름:

```text
Home (레벨 선택)
  → Unit (단원 선택)
    → Word (회독 학습)
```

---

## 상태 분리 원칙

| 종류 | 위치 | 예 |
|---|---|---|
| 서버 데이터 | React Query (`services/*/queries.ts`) | 레벨별 단어 수, 단원 단어 목록 |
| 학습 기록 | Zustand persist (`store/`) | 회독 수, 마지막 학습 단원, 누적 시간 |
| UI 일시 상태 | 컴포넌트 local state 또는 모달 store | 모달 open, 카드 flip |

같은 데이터를 Query와 Store에 동시에 정본으로 두지 않는다.

---

## Import alias

| Alias | 경로 |
|---|---|
| `@/` | `src/` |
| `@components` | `src/components` |
| `@utils` | `src/utils` |
| `@styles` | `src/styles` |

공통 컴포넌트는 `@/components` import를 우선한다.

---

## 관련 문서

- 코딩 규칙: `docs/ai/coding-guidelines.md`
- 작업 순서: `docs/ai/workflow.md`
- 컴포넌트 선택/확장: `docs/ai/component-guidelines.md`
- UI 검증 체크리스트: `docs/ai/checklists/component-review.md`
- 디자인 토큰: `docs/design-system/tokens.md`
- 컴포넌트별 사용 규칙: `docs/design-system/components/`
