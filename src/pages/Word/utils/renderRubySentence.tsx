import type { ReactNode } from "react";

import type { FuriganaPosition } from "@/services/word/types.ts";

/**
 * API `furigana_positions`의 start/end는 codepoint(문자) 인덱스, end는 inclusive.
 */
export function renderRubySentence(
  sentence: string,
  positions: FuriganaPosition[] = []
): ReactNode[] {
  const chars = Array.from(sentence);
  if (!positions.length) return [sentence];

  const sorted = [...positions]
    .filter((position) => position.start >= 0 && position.end < chars.length && position.start <= position.end)
    .sort((a, b) => a.start - b.start || b.end - a.end);

  const filtered: FuriganaPosition[] = [];
  let nextStart = 0;
  for (const position of sorted) {
    if (position.start < nextStart) continue;
    filtered.push(position);
    nextStart = position.end + 1;
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;

  filtered.forEach((position, index) => {
    if (cursor < position.start) {
      nodes.push(chars.slice(cursor, position.start).join(""));
    }

    const base = chars.slice(position.start, position.end + 1).join("");
    nodes.push(
      <ruby key={`ruby-${index}-${position.start}-${position.end}`}>
        {base}
        <rp>(</rp>
        <rt>{position.text}</rt>
        <rp>)</rp>
      </ruby>
    );

    cursor = position.end + 1;
  });

  if (cursor < chars.length) {
    nodes.push(chars.slice(cursor).join(""));
  }

  return nodes;
}
