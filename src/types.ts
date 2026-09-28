export type Clef = 'treble' | 'bass'

export type Level = 'beginner' | 'intermediate' | 'advanced'

export type Feedback = "none" | "correct" | "incorrect";

export interface NoteDefinition {
  /** Display name e.g. "C" */
  name: string
  /** Piano key label and EasyScore/Tone note, e.g. "C4", "F#4", "Bb3" */
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
