export type Clef = "treble" | "bass";

export type Level = "beginner" | "intermediate" | "advanced";

export type Feedback = "none" | "correct" | "incorrect";

export interface NoteDefinition {
  name: string;
  keyLabel: string;
  octave: number;
}

export interface Question {
  note: NoteDefinition;
  clef: Clef;
}

export interface Answer {
  question: Question;
  selected: string | null;
  correct: boolean;
}

export type GamePhase = "menu" | "playing" | "results";
