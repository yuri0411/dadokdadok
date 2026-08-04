# Design Tokens

## 1. 목적

디자인 토큰은 프로젝트에서 반복해서 사용하는 색상, 간격, 글꼴, 테두리, 그림자 등의 시각적 값을 일관되게 관리하기 위한 공통 기준이다.

Figma와 프론트엔드 코드에서 동일한 개념과 이름을 사용해 디자인과 구현 간 차이를 줄이는 것을 목표로 한다.

디자인 토큰은 다음 영역에서 공통으로 사용한다.

- Figma Variables
- CSS Variables
- React 공통 컴포넌트
- Storybook
- Cursor, Claude, Codex 작업 규칙
- 디자인 시스템 문서

---

## 2. 기본 원칙

### 2.1 직접 값을 사용하지 않는다

컴포넌트 내부에서는 특별한 이유가 없는 한 색상 코드, 간격, radius 값을 직접 작성하지 않는다.

```css
/* 지양 */
.button {
  color: #ffffff;
  background-color: #526fff;
  padding: 0 16px;
  border-radius: 8px;
}
```

```css
/* 권장 */
.button {
  color: var(--color-text-on-primary);
  background-color: var(--color-action-primary);
  padding-inline: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

---

### 2.2 토큰은 역할에 따라 구분한다

토큰은 다음 세 단계로 구분한다.

```text
Primitive Token
        ↓
Semantic Token
        ↓
Component Token
```

#### Primitive Token

실제 색상이나 크기 값을 표현하는 가장 기본적인 토큰이다.

```text
color.blue.500
color.gray.900
spacing.4
radius.md
```

#### Semantic Token

값이 사용되는 목적과 의미를 표현한다.

```text
color.text.primary
color.background.default
color.action.primary
color.border.default
```

#### Component Token

특정 컴포넌트에서 사용하는 역할을 표현한다.

```text
button.primary.background
button.primary.text
input.border.default
modal.background
```

초기에는 Primitive Token과 Semantic Token을 중심으로 구성한다.

특정 컴포넌트의 스타일이 복잡해지거나 여러 테마를 지원해야 할 때 Component Token을 추가한다.

---

## 3. 네이밍 규칙

토큰 이름은 다음 구조를 따른다.

```text
category.property.variant.state
```

예시:

```text
color.text.primary
color.background.default
color.action.primary.hover
color.border.error
```

CSS Variable에서는 점 대신 하이픈을 사용한다.

```css
--color-text-primary
--color-background-default
--color-action-primary-hover
--color-border-error
```

### 네이밍 원칙

- 실제 색상 이름보다 사용 목적을 우선한다.
- 이름만 보고 토큰의 역할을 이해할 수 있어야 한다.
- `light`, `dark` 같은 외형보다 `default`, `subtle`, `strong` 같은 역할 기반 이름을 사용한다.
- 컴포넌트 코드에서는 가능한 한 Semantic Token을 사용한다.
- 동일한 의미의 토큰을 중복 생성하지 않는다.

---

## 4. Color Tokens

### 4.1 Primitive Color

Primitive Color는 실제 색상값을 관리한다.

```css
:root {
  --color-white: #ffffff;
  --color-black: #000000;

  --color-blue-50: #f2f5ff;
  --color-blue-100: #e3e9ff;
  --color-blue-200: #c7d2ff;
  --color-blue-300: #a4b3ff;
  --color-blue-400: #7d91ff;
  --color-blue-500: #526fff;
  --color-blue-600: #4058db;
  --color-blue-700: #3448b5;

  --color-gray-50: #f8f9fb;
  --color-gray-100: #f0f1f3;
  --color-gray-200: #e2e4e8;
  --color-gray-300: #cdd0d5;
  --color-gray-400: #a8adb5;
  --color-gray-500: #7d838c;
  --color-gray-600: #626870;
  --color-gray-700: #484d54;
  --color-gray-800: #2e3237;
  --color-gray-900: #1a1d21;

  --color-red-50: #fff2f2;
  --color-red-500: #e5484d;
  --color-red-600: #d13438;

  --color-green-50: #effaf3;
  --color-green-500: #30a46c;
  --color-green-600: #2b8a5d;

  --color-yellow-50: #fff9e8;
  --color-yellow-500: #f5a623;
  --color-yellow-600: #d99112;
}
```

실제 색상값은 Figma 디자인을 기준으로 조정한다.

---

### 4.2 Semantic Color

Semantic Color는 UI에서 색상이 사용되는 목적을 표현한다.

```css
:root {
  /* Background */
  --color-background-default: var(--color-white);
  --color-background-subtle: var(--color-gray-50);
  --color-background-muted: var(--color-gray-100);
  --color-background-overlay: rgba(0, 0, 0, 0.45);

  /* Text */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-disabled: var(--color-gray-400);
  --color-text-inverse: var(--color-white);
  --color-text-on-primary: var(--color-white);

  /* Border */
  --color-border-default: var(--color-gray-200);
  --color-border-strong: var(--color-gray-400);
  --color-border-focus: var(--color-blue-500);
  --color-border-error: var(--color-red-500);

  /* Action */
  --color-action-primary: var(--color-blue-500);
  --color-action-primary-hover: var(--color-blue-600);
  --color-action-primary-active: var(--color-blue-700);
  --color-action-disabled: var(--color-gray-200);

  /* Status */
  --color-status-success: var(--color-green-500);
  --color-status-success-background: var(--color-green-50);
  --color-status-warning: var(--color-yellow-600);
  --color-status-warning-background: var(--color-yellow-50);
  --color-status-error: var(--color-red-500);
  --color-status-error-background: var(--color-red-50);
}
```

---

### 4.3 Dark Theme

다크 테마를 지원하는 경우 Primitive Token은 유지하고 Semantic Token의 연결값만 변경한다.

```css
:root[data-theme='dark'] {
  --color-background-default: var(--color-gray-900);
  --color-background-subtle: var(--color-gray-800);
  --color-background-muted: var(--color-gray-700);

  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-300);
  --color-text-disabled: var(--color-gray-500);

  --color-border-default: var(--color-gray-700);
  --color-border-strong: var(--color-gray-500);
}
```

---

## 5. Spacing Tokens

간격은 4px 단위를 기본으로 사용한다.

```css
:root {
  --spacing-0: 0;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
}
```

### 사용 기준

- 컴포넌트 내부의 작은 간격: `spacing-1` ~ `spacing-4`
- 컴포넌트 간 간격: `spacing-4` ~ `spacing-8`
- 페이지 또는 섹션 간 간격: `spacing-8` 이상
- 새로운 간격값이 필요한 경우 기존 토큰으로 표현할 수 있는지 먼저 확인한다.

예시:

```css
.card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
}
```

---

## 6. Typography Tokens

### 6.1 Font Family

```css
:root {
  --font-family-sans:
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}
```

---

### 6.2 Font Size

```css
:root {
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 32px;
}
```

---

### 6.3 Font Weight

```css
:root {
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

---

### 6.4 Line Height

```css
:root {
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;
}
```

---

### 6.5 Semantic Typography

반복적으로 사용하는 텍스트 스타일은 의미 기반 토큰으로 정의한다.

```css
:root {
  --typography-body-size: var(--font-size-md);
  --typography-body-weight: var(--font-weight-regular);
  --typography-body-line-height: var(--line-height-normal);

  --typography-label-size: var(--font-size-sm);
  --typography-label-weight: var(--font-weight-medium);
  --typography-label-line-height: var(--line-height-normal);

  --typography-heading-size: var(--font-size-2xl);
  --typography-heading-weight: var(--font-weight-bold);
  --typography-heading-line-height: var(--line-height-tight);
}
```

---

## 7. Radius Tokens

```css
:root {
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

### 사용 기준

- Input, Button: `radius-md`
- Card, Modal: `radius-lg` 또는 `radius-xl`
- Badge, Chip, Avatar: `radius-full`

---

## 8. Border Tokens

```css
:root {
  --border-width-none: 0;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
}
```

예시:

```css
.input {
  border:
    var(--border-width-thin)
    solid
    var(--color-border-default);
}
```

---

## 9. Shadow Tokens

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.14);
}
```

### 사용 기준

- 작은 카드 또는 떠 있는 요소: `shadow-sm`
- Dropdown, Popover: `shadow-md`
- Modal: `shadow-lg`

그림자는 구조와 계층을 표현할 때만 사용하고, 단순 장식 목적으로 과도하게 사용하지 않는다.

---

## 10. Z-index Tokens

```css
:root {
  --z-index-base: 0;
  --z-index-dropdown: 100;
  --z-index-sticky: 200;
  --z-index-overlay: 300;
  --z-index-modal: 400;
  --z-index-toast: 500;
}
```

컴포넌트에서 임의의 z-index 값을 직접 작성하지 않는다.

---

## 11. Motion Tokens

```css
:root {
  --duration-fast: 120ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;

  --easing-standard: cubic-bezier(0.2, 0, 0, 1);
  --easing-emphasized: cubic-bezier(0.2, 0, 0, 1.2);
}
```

예시:

```css
.button {
  transition:
    background-color var(--duration-fast) var(--easing-standard),
    border-color var(--duration-fast) var(--easing-standard),
    color var(--duration-fast) var(--easing-standard);
}
```

애니메이션은 사용자의 행동 결과나 상태 변화를 이해하는 데 도움이 되는 범위에서 사용한다.

---

## 12. Component Token 예시

컴포넌트가 복잡해질 경우 Semantic Token을 기반으로 Component Token을 정의한다.

```css
:root {
  --button-primary-background: var(--color-action-primary);
  --button-primary-background-hover: var(--color-action-primary-hover);
  --button-primary-text: var(--color-text-on-primary);

  --button-secondary-background: var(--color-background-default);
  --button-secondary-border: var(--color-border-default);
  --button-secondary-text: var(--color-text-primary);

  --input-background: var(--color-background-default);
  --input-border: var(--color-border-default);
  --input-border-focus: var(--color-border-focus);
  --input-border-error: var(--color-border-error);
  --input-text: var(--color-text-primary);
  --input-placeholder: var(--color-text-secondary);
}
```

컴포넌트 토큰은 다음 조건 중 하나 이상에 해당할 때 추가한다.

- 한 컴포넌트에 여러 상태와 variant가 존재하는 경우
- 테마 변경에 따라 컴포넌트 스타일을 개별 조정해야 하는 경우
- Semantic Token만으로 컴포넌트의 역할을 명확히 표현하기 어려운 경우

---

## 13. Figma Variables 구조

Figma에서는 다음과 같이 Variable Collection을 구분한다.

```text
Primitive
├── color
├── spacing
├── radius
└── typography

Semantic
├── color
├── typography
└── elevation

Component
├── button
├── input
└── modal
```

예시:

```text
primitive/color/blue/500
primitive/color/gray/900
primitive/spacing/4
primitive/radius/md

semantic/color/text/primary
semantic/color/background/default
semantic/color/action/primary
semantic/color/border/default

component/button/primary/background
component/button/primary/text
```

Figma의 Semantic Variable은 Primitive Variable을 참조한다.

```text
semantic/color/action/primary
→ primitive/color/blue/500
```

Figma와 CSS의 이름은 가능한 한 동일한 구조를 유지한다.

```text
Figma
semantic/color/text/primary

CSS
--color-text-primary
```

---

## 14. 파일 구조

디자인 토큰은 다음과 같이 관리한다.

```text
src/
└── styles/
    └── tokens/
        ├── colors.css
        ├── spacing.css
        ├── typography.css
        ├── radius.css
        ├── shadow.css
        ├── motion.css
        └── index.css
```

`index.css`에서 모든 토큰 파일을 불러온다.

```css
@import './colors.css';
@import './spacing.css';
@import './typography.css';
@import './radius.css';
@import './shadow.css';
@import './motion.css';
```

애플리케이션의 전역 스타일 파일에서 토큰을 한 번만 import한다.

```css
@import './styles/tokens/index.css';
```

---

## 15. 컴포넌트 사용 예시

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);

  min-height: 40px;
  padding-inline: var(--spacing-4);

  color: var(--button-primary-text);
  background-color: var(--button-primary-background);

  border: 0;
  border-radius: var(--radius-md);

  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);

  transition:
    background-color var(--duration-fast) var(--easing-standard),
    opacity var(--duration-fast) var(--easing-standard);
}

.button:hover:not(:disabled) {
  background-color: var(--button-primary-background-hover);
}

.button:focus-visible {
  outline: var(--border-width-medium) solid var(--color-border-focus);
  outline-offset: var(--spacing-1);
}

.button:disabled {
  color: var(--color-text-disabled);
  background-color: var(--color-action-disabled);
  cursor: not-allowed;
}
```

---

## 16. 토큰 추가 및 변경 규칙

새로운 토큰을 추가하기 전에 다음 항목을 확인한다.

- 기존 토큰으로 표현할 수 없는 값인가?
- 특정 화면에서만 사용하는 임시 값은 아닌가?
- 여러 컴포넌트에서 반복해서 사용할 가능성이 있는가?
- 토큰 이름이 실제 값이 아니라 역할을 나타내는가?
- Figma와 코드 양쪽에 동일하게 반영할 수 있는가?

토큰을 변경할 때는 다음 범위를 함께 확인한다.

- Figma Variables
- CSS Variables
- 공통 컴포넌트
- Storybook
- 다크 테마
- 관련 문서

---

## 17. 금지 사항

다음 방식은 사용하지 않는다.

```css
/* 컴포넌트 내부의 직접 색상값 */
color: #17191c;

/* 임의의 간격값 */
padding: 13px 18px;

/* 임의의 radius */
border-radius: 7px;

/* 임의의 z-index */
z-index: 9999;

/* 의미가 불분명한 토큰 */
--blue-color: #526fff;
--gray-text: #626870;
```

예외적으로 직접 값을 사용해야 하는 경우에는 코드 주석이나 문서에 이유를 남긴다.

---

## 18. 초기 적용 범위

초기 디자인 시스템에서는 다음 토큰부터 우선 적용한다.

- Color
- Spacing
- Typography
- Radius
- Border
- Shadow

Motion, z-index, Component Token은 실제 필요가 생길 때 점진적으로 확장한다.

초기 적용 대상 컴포넌트는 다음과 같다.

- Button
- Input
- Modal
- Badge
- Progress

---

## 19. 검토 체크리스트

- [ ] 컴포넌트에 직접 작성된 HEX 색상값이 없는가?
- [ ] 간격이 정의된 spacing token을 사용하는가?
- [ ] radius가 정의된 token을 사용하는가?
- [ ] 의미 기반 Semantic Token을 우선 사용했는가?
- [ ] Figma Variable 이름과 코드 토큰 이름이 대응되는가?
- [ ] 다크 테마에서 Semantic Token이 올바르게 변경되는가?
- [ ] 동일한 역할의 토큰이 중복 정의되지 않았는가?
- [ ] 새로운 토큰을 추가한 이유가 명확한가?