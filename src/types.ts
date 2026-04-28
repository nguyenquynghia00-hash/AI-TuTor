export type Level = 'easy' | 'medium' | 'hard';

export interface FlashcardData {
  id: string;
  front: string;
  back: string;
  explain: string;
  level: Level;
  status: 'new' | 'learning' | 'review' | 'graduated';
  nextReviewDate?: number;
}

export interface Deck {
  id: string;
  name: string;
  subject: string;
  className: string;
  cards: FlashcardData[];
  createdAt: number;
  updatedAt: number;
}

export interface StudySession {
  deckId: string;
  cards: FlashcardData[];
}
