import type { ReactNode } from "react";

import type { FuriganaPosition } from "@/services/word/types.ts";

interface ResolvedFurigana {
  start: number;
  end: number;
  text: string;
}

interface RenderExampleSentenceOptions {
  showFurigana?: boolean;
  highlightWord?: string;
  highlightClassName?: string;
}

function findSubstringRange(chars: string[], target: string): { start: number; end: number } | null {
  const targetChars = Array.from(target);
  if (!targetChars.length || targetChars.length > chars.length) return null;

  for (let index = 0; index <= chars.length - targetChars.length; index += 1) {
    const matched = targetChars.every((char, offset) => chars[index + offset] === char);
    if (matched) {
      return { start: index, end: index + targetChars.length - 1 };
    }
  }

  return null;
}

function findUnoccupiedRange(
  chars: string[],
  target: string,
  occupied: boolean[]
): { start: number; end: number } | null {
  const targetChars = Array.from(target);
  if (!targetChars.length || targetChars.length > chars.length) return null;

  for (let index = 0; index <= chars.length - targetChars.length; index += 1) {
    const matched = targetChars.every((char, offset) => {
      const charIndex = index + offset;
      return chars[charIndex] === char && !occupied[charIndex];
    });
    if (matched) {
      return { start: index, end: index + targetChars.length - 1 };
    }
  }

  return null;
}

/**
 * API `furigana_positions`의 start/end는 문장 기준이어야 하지만,
 * 일부 응답은 단어 상대 인덱스이거나 어긋나 있다.
 * kanji와 실제 문장을 대조해 위치를 보정한다.
 */
function resolveFuriganaPositions(
  sentence: string,
  positions: FuriganaPosition[]
): ResolvedFurigana[] {
  const chars = Array.from(sentence);
  const occupied = Array.from({ length: chars.length }, () => false);
  const resolved: ResolvedFurigana[] = [];

  const sorted = [...positions].sort((a, b) => a.start - b.start || b.end - a.end);

  for (const position of sorted) {
    const kanji = position.kanji || chars.slice(position.start, position.end + 1).join("");
    if (!kanji) continue;

    const directBase =
      position.start >= 0 && position.end < chars.length && position.start <= position.end
        ? chars.slice(position.start, position.end + 1).join("")
        : "";

    const range =
      directBase === kanji
        ? { start: position.start, end: position.end }
        : findUnoccupiedRange(chars, kanji, occupied);

    if (!range) continue;

    let overlaps = false;
    for (let index = range.start; index <= range.end; index += 1) {
      if (occupied[index]) {
        overlaps = true;
        break;
      }
    }
    if (overlaps) continue;

    for (let index = range.start; index <= range.end; index += 1) {
      occupied[index] = true;
    }

    resolved.push({ start: range.start, end: range.end, text: position.text });
  }

  return resolved.sort((a, b) => a.start - b.start);
}

function isInRange(index: number, range: { start: number; end: number } | null) {
  return Boolean(range && index >= range.start && index <= range.end);
}

/**
 * 예문 렌더링: 후리가나(ruby) + 학습 단어 하이라이트
 */
export function renderExampleSentence(
  sentence: string,
  positions: FuriganaPosition[] = [],
  {
    showFurigana = true,
    highlightWord,
    highlightClassName,
  }: RenderExampleSentenceOptions = {}
): ReactNode[] {
  const chars = Array.from(sentence);
  if (!chars.length) return [sentence];

  const furiganaRanges = showFurigana ? resolveFuriganaPositions(sentence, positions) : [];
  const highlightRange = highlightWord ? findSubstringRange(chars, highlightWord) : null;
  const furiganaByStart = new Map(furiganaRanges.map((range) => [range.start, range]));

  const nodes: ReactNode[] = [];
  let cursor = 0;

  while (cursor < chars.length) {
    const furigana = furiganaByStart.get(cursor);

    if (furigana) {
      const base = chars.slice(furigana.start, furigana.end + 1).join("");
      const highlighted =
        isInRange(furigana.start, highlightRange) && isInRange(furigana.end, highlightRange);

      nodes.push(
        <ruby
          key={`ruby-${furigana.start}-${furigana.end}`}
          className={highlighted ? highlightClassName : undefined}
        >
          {base}
          <rp>(</rp>
          <rt>{furigana.text}</rt>
          <rp>)</rp>
        </ruby>
      );
      cursor = furigana.end + 1;
      continue;
    }

    const nextFuriganaStart = furiganaRanges.find((range) => range.start > cursor)?.start;
    const limit = nextFuriganaStart ?? chars.length;
    const highlighted = isInRange(cursor, highlightRange);

    let end = cursor + 1;
    while (end < limit && isInRange(end, highlightRange) === highlighted) {
      end += 1;
    }

    const text = chars.slice(cursor, end).join("");
    nodes.push(
      highlighted && highlightClassName ? (
        <span key={`text-${cursor}-${end}`} className={highlightClassName}>
          {text}
        </span>
      ) : (
        text
      )
    );
    cursor = end;
  }

  return nodes;
}

/**
 * 예문 한국어 뜻에서 단어 뜻(meaning_ko)에 해당하는 부분만 강조한다.
 */
export function renderHighlightedMeaning(
  text: string,
  meaning: string,
  highlightClassName: string
): ReactNode {
  const candidates = [meaning, meaning.replace(/(하다|되다|이다|다)$/u, "")].filter(
    (candidate, index, list) => Boolean(candidate) && list.indexOf(candidate) === index
  );

  for (const candidate of candidates) {
    const start = text.indexOf(candidate);
    if (start < 0) continue;

    const end = start + candidate.length;
    return (
      <>
        {text.slice(0, start)}
        <span className={highlightClassName}>{text.slice(start, end)}</span>
        {text.slice(end)}
      </>
    );
  }

  return text;
}
