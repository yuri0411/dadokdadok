# Component Review Checklist

UI 관련 작업을 끝낸 뒤, AI와 사람이 공통으로 사용하는 검증 기준이다.

코드를 생성했다고 끝내지 말고, 해당 항목을 확인한 뒤 결과를 보고한다.
공통 컴포넌트 변경 시 Vitest 테스트를 작성하고 `yarn test:run`으로 검증한다.

---

## 재사용 & 구조

- [ ] 기존 공통 컴포넌트(`src/components`)를 재사용했는가?
- [ ] 같은 UI를 페이지에서 새로 구현하지 않았는가?
- [ ] 공통 컴포넌트는 `@/components`에서 import했는가?
- [ ] 요청 범위를 넘는 리팩터링을 하지 않았는가?

## 디자인 토큰

- [ ] 하드코딩된 색상값(HEX/RGB)이 없는가?
- [ ] 하드코딩된 spacing / radius가 없는가?
- [ ] 임의의 z-index를 추가하지 않았는가?
- [ ] 스타일이 `src/styles/tokens/` 토큰을 사용하는가?

## API & Figma 대응

- [ ] Figma property / variant와 React props가 대응되는가?
- [ ] `variant` / `color` / `size` 네이밍이 기존 컨벤션과 맞는가?
- [ ] 관련 `docs/design-system/components/*.md`를 갱신했는가? (공통 컴포넌트 변경 시)

## Storybook

- [ ] Storybook story를 추가하거나 갱신했는가? (공통 컴포넌트 변경 시)
- [ ] default 상태가 있는가?
- [ ] disabled 상태가 필요한 경우 있는가?
- [ ] loading 상태가 필요한 경우 구현되었는가?
- [ ] long content / 좁은 너비 상태를 확인했는가?

## Accessibility

- [ ] 버튼·컨트롤에 접근 가능한 이름이 있는가?
- [ ] keyboard focus 스타일이 보이는가?
- [ ] `aria-*` / `role` 속성이 올바른가?
- [ ] 아이콘 전용 컨트롤에 `aria-label`이 있는가?

## 반응형 & 동작

- [ ] 모바일 폭(약 320~390px)에서 레이아웃이 깨지지 않는가?
- [ ] 로딩/에러/빈 상태를 적절히 처리했는가?
- [ ] Modal / FeedbackModal 사용 기준이 맞는가?

## 명령 검증

- [ ] `yarn test:run` 통과
- [ ] `yarn lint` 통과
- [ ] `yarn build` 통과
- [ ] Storybook 변경 시 `yarn build-storybook` 통과

---

## 보고 형식

검증 후 아래를 간단히 남긴다.

```text
Changed files:
Reused components:
Added/updated variants or props:
Checklist gaps (if any):
Commands:
- yarn test:run: pass | fail
- yarn lint: pass | fail
- yarn build: pass | fail
- yarn build-storybook: pass | fail | skipped
```
