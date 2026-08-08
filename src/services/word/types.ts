export interface Word {
  id: number;
  word: string;
  meaning: string;
  furigana: string;
  romaji: string;
  level: number;
  meaning_ko: string;
}

export interface FuriganaPosition {
  start: number;
  end: number;
  text: string;
  kanji: string;
}

export interface ExampleSentence {
  word: string;
  sentence: string;
  korean_meaning: string;
  furigana_positions: FuriganaPosition[];
}
