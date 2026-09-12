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
8. 공통 컴포넌트의 동작·접근성 테스트를 추가하거나 갱신한다.
9. `yarn test:run`, `yarn lint`, `yarn typecheck`를 실행한다. UI 구조 변경이 크면 `yarn build-storybook`도 실행한다.

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
   - 서버 OpenAPI가 변경된 경우 `yarn api:generate` 실행
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
- [ ] 공통 컴포넌트 테스트가 통과하는가?
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

---

## 7. Pull Request와 CI

1. AI가 생성한 코드는 작업 브랜치에서 커밋하고 Pull Request를 만든다.
2. GitHub Actions에서 다음 검사를 독립적으로 실행한다.
   - `yarn lint`
   - `yarn typecheck`
   - `yarn test:run`
   - `yarn build`
3. 하나라도 실패하면 해당 검사 로그에서 원인을 확인한다.
4. 원인을 수정해 같은 Pull Request 브랜치에 푸시한다.
5. 모든 필수 검사가 통과할 때까지 3~4단계를 반복한다.
6. `lint`, `typecheck`, `test`, `build`가 모두 통과한 뒤에만 `main`에 merge한다.

검사를 통과시키기 위해 테스트를 삭제하거나, 규칙을 비활성화하거나, 실패를 무시하도록 CI를 변경하지 않는다.

## 8. 자동 검증 하네스

로컬에서는 `yarn verify`로 lint → typecheck → test → build를 실행한다.
CI는 기존 네 개 검사를 독립 실행해 실패 원인을 구분한다.
Storybook 변경 시에는 별도로 `yarn build-storybook`도 실행한다.

- ESLint는 UI·hooks·store·utils에서 HTTP 클라이언트와 생성 API를 직접 가져오는 것을 차단한다. alias와 상대 경로 모두 검사한다.
- 위 계층의 axios import, 전역 fetch/XMLHttpRequest 및 window/globalThis/self를 통한 직접 호출을 차단한다.
- 공통 컴포넌트에서 pages를 가져오면 실패한다.
- 오류 메시지가 안내하는 도메인 service 경계로 코드를 이동한 뒤 다시 검사한다.
- `scripts/architecture.test.mjs`는 금지 사례와 허용 사례로 검사 설정 자체를 검증한다.
- `src/store/learningState.test.ts`는 레벨·단원별 기록, 회독, 초기화, 시간 누적, 복습 토글과 이전 데이터 이관을 검증한다. 각 테스트는 저장소를 비우고 모듈을 다시 로드하며, 복원 검증은 데이터를 저장한 뒤 새 store 인스턴스를 사용한다.

버그 수정 시 먼저 사용자 동작을 나타내는 실패 테스트로 재현하고, 수정 후 해당 테스트와 전체 검증을 실행한다. API 경계 규칙은 정적 import와 명시적 전역 접근을 검사하는 개발 규칙이며, 임의 코드의 네트워크 접근을 막는 보안 경계는 아니다.

현재 자동 검사 범위에 CSS 토큰, 인라인 스타일, 브라우저 전체 흐름은 포함되지 않는다. 기존 UI 검토 체크리스트는 계속 적용한다. 후속 확장은 기존 시각 값의 정리와 고정 API 데이터 기반 브라우저 검증을 별도 작업으로 진행한다.
