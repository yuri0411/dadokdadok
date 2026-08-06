# Component Guidelines

공통 컴포넌트를 언제 재사용하고, 어떻게 확장할지에 대한 기준이다.

AI나 사람이 화면을 구현할 때 “코드가 어떻게 생겼는지”뿐 아니라 “어떤 컴포넌트를 써야 하는지”를 이 문서와 `components/*.md`를 기준으로 판단한다.

---

## 1. 기본 원칙

- 화면에서 직접 `<button>`, `<h1>` 스타일, 임의 loader를 만들지 않는다.
- 공통 컴포넌트는 `@/components`에서 import한다.
- 스타일은 CSS Module + 디자인 토큰을 사용한다.
- 새 variant가 필요하면 먼저 Storybook과 사용 규칙 문서에 추가할 수 있는지 확인한다.
- 한 화면에서만 쓰는 스타일은 페이지/피처 컴포넌트에 두고, 2곳 이상에서 반복되면 공통으로 올린다.

---

## 2. Props 네이밍

Figma property와 React props를 가능한 한 동일하게 맞춘다.

| 공통 개념 | React 값 |
|---|---|
| 시각적 스타일 | `variant`: `filled` \| `outlined` \| `ghost` |
| 의미/강조색 | `color`: `default` \| `primary` \| `secondary` \| `tertiary` \| `disabled` |
| 크기 | `size`: `sm` \| `md` \| `lg` \| `xl` |
| 텍스트 계층 | Typography `variant`: `headline` \| `h2` … `overline` |

새로운 prop을 추가할 때는 기존 컴포넌트와 이름이 충돌하지 않는지 확인한다.

---

## 3. 컴포넌트 선택 기준

| 상황 | 사용할 컴포넌트 |
|---|---|
| 클릭으로 즉시 실행되는 액션 | `Button` |
| 확인/취소가 필요한 대화 | `Modal` |
| 짧은 안내 후 자동 닫힘 | `FeedbackModal` |
| 상태·회독 수 등 짧은 라벨 | `Tag` |
| 제목·본문·보조 텍스트 | `Typography` |
| 학습 진행률 | `ProgressBar` |
| 요소 정렬·간격 | `Stack` |
| 데이터 로딩 중 표시 | `CircularLoader` 또는 `Skeleton` |
| 버튼 내부 비동기 처리 | `Button`의 `loading` |
| API 실패 / 빈 결과 안내 | `ErrorFallback` |

없는 컴포넌트가 필요하면 임시로 페이지에 구현하지 말고, 공통 컴포넌트 추가 여부를 먼저 결정한다.

---

## 4. 확장 규칙

공통 컴포넌트를 바꿀 때는 다음 순서를 따른다.

1. 기존 props / variant로 표현 가능한지 확인
2. 불가능하면 최소 범위의 prop 또는 variant 추가
3. CSS는 토큰 기반으로 작성
4. Storybook에 새 상태 추가
5. `docs/design-system/components/*.md` 갱신

한 화면의 예외 스타일을 공통 컴포넌트에 넣지 않는다. 예외가 필요하면 해당 화면에서 `className`으로 한정하거나, 별도 피처 컴포넌트를 만든다.

---

## 5. 금지 사항

- 공통 컴포넌트와 동일한 UI를 페이지에서 새로 구현하기
- 토큰 없이 HEX, 임의 spacing, 임의 radius 직접 작성하기
- Figma에 없는 variant를 문서/Story 없이 코드에만 추가하기
- `color="disabled"`와 `disabled` prop을 혼용하는 방식으로 의미 중복 만들기
  - 비활성 상태는 가능하면 `disabled` / `loading` prop으로 처리한다

---

## 6. 검증 체크리스트

컴포넌트 관련 작업 후 아래를 확인한다.

- [ ] `@/components`의 기존 컴포넌트를 재사용했는가?
- [ ] 스타일이 디자인 토큰을 사용하는가?
- [ ] Storybook에 주요 상태(default, disabled/loading, size, long content)가 있는가?
- [ ] `components/*.md`의 사용 규칙과 실제 props가 일치하는가?
- [ ] 한 영역에서 primary 액션이 하나만 있는가?
