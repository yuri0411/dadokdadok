# Workflow

AI와 사람이 기능을 구현하거나 수정할 때 따르는 공통 작업 순서다.

도구마다 다른 절차를 만들지 않는다. 이 문서를 기준으로 한다.

---

## 1. 공통 컴포넌트 생성 / 수정

1. `src/components`에서 기존 컴포넌트로 해결 가능한지 검색한다.
2. 아래 문서를 확인한다.
   - `docs/design-system/tokens.md`
   - `docs/design-system/component-guidelines.md`
   - 관련 `docs/design-system/components/*.md`
3. Figma property와 React props 대응을 확인한다.
4. 토큰 기반으로 컴포넌트를 구현하거나 수정한다.
5. Storybook story를 추가/갱신한다.
6. 최소한 다음 상태를 확인한다.
   - default
   - disabled / loading (해당되는 경우)
   - size / variant / color 조합
   - long content
7. 사용 규칙 문서(`docs/design-system/components/*.md`)를 갱신한다.
8. `yarn lint`를 실행한다. UI 구조 변경이 크면 `yarn build-storybook`도 실행한다.

---

## 2. 화면(페이지) 구현 / 수정

1. 관련 라우트와 페이지 파일을 확인한다.
   - `src/routes/paths.ts`
   - `src/routes/router.tsx`
   - `src/pages/...`
2. 필요한 UI를 공통 컴포넌트 조합으로 구성한다.
3. 서버 데이터가 필요하면 `services/<domain>`에 api/query를 추가하거나 재사용한다.
4. 클라이언트 영속 상태가 필요하면 기존 Zustand store 확장 여부를 먼저 검토한다.
5. 페이지 전용 스타일은 CSS Module로 두고, 색/간격은 토큰을 사용한다.
6. 로딩은 `CircularLoader` 또는 `Button loading`을 상황에 맞게 사용한다.
7. 확인이 필요한 결정은 `Modal`, 짧은 완료 안내는 `FeedbackModal`을 사용한다.

---

## 3. Figma를 보고 구현할 때

Code Connect 없이 Figma 링크만 있는 경우, 아래를 텍스트로 함께 정리한 뒤 구현한다.

- 어떤 화면/컴포넌트인지
- 사용할 기존 공통 컴포넌트
- variant / color / size
- 토큰으로 표현할 색·간격·타이포
- 상호작용(hover, disabled, loading, modal)

구현 중 hard-coded 값이 필요해 보이면 먼저 기존 토큰으로 대체 가능한지 확인한다.

---

## 4. API / 상태 변경

1. 서버 응답인지 클라이언트 상태인지 구분한다.
2. 서버 데이터면:
   - `services/<domain>/types.ts`
   - `services/<domain>/api.ts`
   - `services/<domain>/queries.ts`
3. 클라이언트 상태면:
   - 기존 store에 필드를 추가할 수 있는지 확인
   - persist 필요 여부를 결정
4. 컴포넌트에서 API를 직접 호출하지 않는다.

---

## 5. 작업 완료 전 체크

UI 작업은 `docs/ai/checklists/component-review.md`를 기준으로 자체 검토한다.

요약:

- [ ] 기존 공통 컴포넌트를 재사용했는가?
- [ ] 새 hard-coded 시각 값을 추가하지 않았는가?
- [ ] props 이름이 기존 컨벤션/Figma mapping과 맞는가?
- [ ] Storybook과 컴포넌트 문서를 갱신했는가? (공통 컴포넌트 변경 시)
- [ ] `yarn lint` / `yarn build`가 통과하는가?
- [ ] 요청 범위를 넘는 리팩터링을 하지 않았는가?

---

## 6. 결과 보고 형식

작업이 끝나면 아래를 간단히 보고한다.

- 변경한 파일
- 재사용한 공통 컴포넌트
- 추가/변경한 variant 또는 props
- 실행한 검증 명령과 결과
- 남은 리스크나 후속 작업
