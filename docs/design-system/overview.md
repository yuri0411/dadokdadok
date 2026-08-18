# Design System Overview

다독다독 디자인 시스템은 Figma, React 컴포넌트, Storybook, AI 작업 규칙이 같은 이름을 공유하도록 만드는 기준이다.

Code Connect를 당장 도입하지 않더라도, 토큰·컴포넌트·사용 규칙 문서를 맞춰 두면 디자인과 구현의 대응 관계를 유지할 수 있다.

---

## 구성

```text
docs/design-system/
├── overview.md
├── tokens.md
├── component-guidelines.md
└── components/
    ├── button.md
    ├── icon-button.md
    ├── modal.md
    ├── feedback-modal.md
    ├── tag.md
    ├── typography.md
    ├── progress-bar.md
    ├── stack.md
    └── circular-loader.md
```

| 문서 | 역할 |
|---|---|
| `tokens.md` | 색상, 간격, 타이포, radius 등 디자인 토큰 정의 |
| `component-guidelines.md` | 공통 컴포넌트 사용·확장 원칙 |
| `components/*.md` | 컴포넌트별 목적, variant, 규칙, Figma mapping |

---

## 현재 공통 컴포넌트

| 컴포넌트 | 경로 | Storybook | 사용 규칙 |
|---|---|---|---|
| Button | `src/components/Button` | Components/Button | [button.md](./components/button.md) |
| IconButton | `src/components/IconButton` | Components/IconButton | [icon-button.md](./components/icon-button.md) |
| Modal | `src/components/Modal` | Components/Modal | [modal.md](./components/modal.md) |
| FeedbackModal | `src/components/Modal` | - | [feedback-modal.md](./components/feedback-modal.md) |
| Tag | `src/components/Tag` | Components/Tag | [tag.md](./components/tag.md) |
| Typography | `src/components/Typography` | Components/Typography | [typography.md](./components/typography.md) |
| ProgressBar | `src/components/ProgressBar` | Components/ProgressBar | [progress-bar.md](./components/progress-bar.md) |
| Stack | `src/components/Stack` | Components/Stack | [stack.md](./components/stack.md) |
| CircularLoader | `src/components/CircularLoader` | Components/CircularLoader | [circular-loader.md](./components/circular-loader.md) |
| Skeleton | `src/components/Skeleton` | Components/Skeleton | [skeleton.md](./components/skeleton.md) |
| ErrorFallback | `src/components/ErrorFallback` | Components/ErrorFallback | [error-fallback.md](./components/error-fallback.md) |

`Lazy`는 라우트 코드 스플리팅용 유틸이므로 디자인 시스템 사용 규칙 대상에서 제외한다.

Input 컴포넌트는 아직 없다. 폼 입력이 필요해지면 공통 Input을 추가한 뒤 `components/input.md`를 작성한다.

---

## 작업 원칙

1. 새 UI는 가능하면 기존 공통 컴포넌트를 조합해 만든다.
2. 스타일 값은 직접 HEX·px을 쓰지 않고 디자인 토큰을 사용한다.
3. Figma variant / property 이름과 React props 이름을 맞춘다.
4. 컴포넌트 변경 시 Storybook story와 `components/*.md`를 함께 갱신한다.
5. 화면 전용 일회성 UI를 공통 컴포넌트로 승격할 때는 재사용 여부를 먼저 확인한다.

---

## 참고 경로

- 토큰: `src/styles/`
- 공통 컴포넌트: `src/components/`
- Storybook: `yarn storybook`
- Figma 시안: 프로젝트 README 링크
