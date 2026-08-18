export const DEFAULT_WORDS_PER_UNIT = 50;

export const WORD_COUNT_OPTIONS = [10, 20, 30, 50] as const;

export type WordCountOption = (typeof WORD_COUNT_OPTIONS)[number];

/** @deprecated settings store의 wordsPerUnit을 사용하세요 */
export const LIMIT = DEFAULT_WORDS_PER_UNIT;
