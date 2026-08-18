# IconButton

## 목적

아이콘만으로 즉시 실행하는 액션에 사용한다.

예: 설정 열기, 복습할 단어 토글, 예문 보기

텍스트 라벨이 있는 액션은 `Button`을 사용한다.

---

## Props

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `aria-label` | `string` | - | 필수. 접근 가능한 이름 |
| `children` | `ReactNode` | - | 아이콘 노드 |
| `variant` | `soft` \| `ghost` | `soft` | 시각적 스타일 |
| `color` | `primary` \| `secondary` \| `tertiary` | `tertiary` | 기본 아이콘 톤 |
| `size` | `sm` \| `md` \| `lg` | `md` | 버튼 크기 |
| `active` | `boolean` | `false` | 선택/켜짐 상태 |
| `disabled` | `boolean` | `false` | 비활성 상태 |

기본 HTML button 속성(`type`, `onClick`, `aria-pressed` 등)도 전달할 수 있다.

---

## Variant

### soft

원형 배경(`surface-subtle`)이 있는 기본 아이콘 버튼이다.

카드 위 보조 액션, 헤더 설정 버튼에 사용한다.

### ghost

배경 없이 아이콘만 보이는 스타일이다.

시각적 비중을 더 낮출 때 사용한다.

---

## Size

| size | 사용 |
|---|---|
| `sm` | 좁은 카드/밀집 UI |
| `md` | 기본값. 카드 토글 |
| `lg` | 헤더 등 터치 영역이 큰 곳 |

---

## 규칙

- `aria-label`을 반드시 제공한다. 아이콘만으로는 의미가 전달되지 않는다.
- 토글형이면 `active`와 함께 `aria-pressed`를 사용한다. `active`만 넘기면 `aria-pressed`는 자동으로 맞춰진다.
- 아이콘 자체에는 `aria-hidden`이 컴포넌트에서 처리되므로, children으로 장식용 아이콘만 넘긴다.
- 텍스트가 필요하면 `IconButton` 대신 `Button` + `startIcon`을 사용한다.
- 같은 화면에서 soft 아이콘 버튼을 페이지 CSS로 다시 만들지 않는다.

---

## 사용 예시

```tsx
import { IoSettingsOutline } from "react-icons/io5";
import { IconButton } from "@/components";

<IconButton aria-label="설정" size="lg" onClick={openSettings}>
  <IoSettingsOutline size={22} />
</IconButton>

<IconButton
  aria-label={isActive ? "복습할 단어에서 제거" : "복습할 단어에 추가"}
  active={isActive}
  onClick={toggle}
>
  {isActive ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
</IconButton>
```

---

## Figma mapping

| Figma property | React prop |
|---|---|
| Variant | `variant` |
| Color | `color` |
| Size | `size` |
| Active / Selected | `active` |
| Disabled | `disabled` |
| Icon | `children` |
| Accessible name | `aria-label` |
