export type Clef = 'treble' | 'bass'

export type Level = 'beginner' | 'intermediate' | 'advanced'

export type Feedback = "none" | "correct" | "incorrect";

export interface NoteDefinition {
  /** VexFlow note name e.g. "C/4" */
  vexNote: string
  /** Display name e.g. "C" */
  name: string
  /** Piano key label e.g. "C4" */
  keyLabel: string
  /** MIDI-style octave number */
  octave: number
}

export interface Question {
  note: NoteDefinition
  clef: Clef
}

export interface Answer {
  question: Question
  selected: string | null
  correct: boolean
}

export type GamePhase = 'menu' | 'playing' | 'results'
