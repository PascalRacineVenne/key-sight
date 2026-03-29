import type { Clef, Level, NoteDefinition, Question } from './types'

const TREBLE_NOTES: NoteDefinition[] = [
  // Beginner: lines and spaces of treble clef (E4–F5)
  { vexNote: 'E/4', name: 'E', keyLabel: 'E4', octave: 4 },
  { vexNote: 'F/4', name: 'F', keyLabel: 'F4', octave: 4 },
  { vexNote: 'G/4', name: 'G', keyLabel: 'G4', octave: 4 },
  { vexNote: 'A/4', name: 'A', keyLabel: 'A4', octave: 4 },
  { vexNote: 'B/4', name: 'B', keyLabel: 'B4', octave: 4 },
  { vexNote: 'C/5', name: 'C', keyLabel: 'C5', octave: 5 },
  { vexNote: 'D/5', name: 'D', keyLabel: 'D5', octave: 5 },
  { vexNote: 'E/5', name: 'E', keyLabel: 'E5', octave: 5 },
  { vexNote: 'F/5', name: 'F', keyLabel: 'F5', octave: 5 },
  // Intermediate adds ledger lines
  { vexNote: 'D/4', name: 'D', keyLabel: 'D4', octave: 4 },
  { vexNote: 'C/4', name: 'C', keyLabel: 'C4', octave: 4 },
  { vexNote: 'G/5', name: 'G', keyLabel: 'G5', octave: 5 },
  { vexNote: 'A/5', name: 'A', keyLabel: 'A5', octave: 5 },
  // Advanced: full chromatic (all accidentals in C4–A5 range)
  { vexNote: 'C#/4', name: 'C#', keyLabel: 'C#4', octave: 4 },
  { vexNote: 'Eb/4', name: 'Eb', keyLabel: 'Eb4', octave: 4 },
  { vexNote: 'F#/4', name: 'F#', keyLabel: 'F#4', octave: 4 },
  { vexNote: 'Ab/4', name: 'Ab', keyLabel: 'Ab4', octave: 4 },
  { vexNote: 'Bb/4', name: 'Bb', keyLabel: 'Bb4', octave: 4 },
  { vexNote: 'C#/5', name: 'C#', keyLabel: 'C#5', octave: 5 },
  { vexNote: 'Eb/5', name: 'Eb', keyLabel: 'Eb5', octave: 5 },
  { vexNote: 'F#/5', name: 'F#', keyLabel: 'F#5', octave: 5 },
  { vexNote: 'Ab/5', name: 'Ab', keyLabel: 'Ab5', octave: 5 },
]

const BASS_NOTES: NoteDefinition[] = [
  // Beginner: lines and spaces of bass clef (G2–A3)
  { vexNote: 'G/2', name: 'G', keyLabel: 'G2', octave: 2 },
  { vexNote: 'A/2', name: 'A', keyLabel: 'A2', octave: 2 },
  { vexNote: 'B/2', name: 'B', keyLabel: 'B2', octave: 2 },
  { vexNote: 'C/3', name: 'C', keyLabel: 'C3', octave: 3 },
  { vexNote: 'D/3', name: 'D', keyLabel: 'D3', octave: 3 },
  { vexNote: 'E/3', name: 'E', keyLabel: 'E3', octave: 3 },
  { vexNote: 'F/3', name: 'F', keyLabel: 'F3', octave: 3 },
  { vexNote: 'G/3', name: 'G', keyLabel: 'G3', octave: 3 },
  { vexNote: 'A/3', name: 'A', keyLabel: 'A3', octave: 3 },
  // Intermediate
  { vexNote: 'F/2', name: 'F', keyLabel: 'F2', octave: 2 },
  { vexNote: 'E/2', name: 'E', keyLabel: 'E2', octave: 2 },
  { vexNote: 'B/3', name: 'B', keyLabel: 'B3', octave: 3 },
  { vexNote: 'C/4', name: 'C', keyLabel: 'C4', octave: 4 },
  // Advanced: full chromatic (all accidentals in E2–C4 range)
  { vexNote: 'F#/2', name: 'F#', keyLabel: 'F#2', octave: 2 },
  { vexNote: 'Ab/2', name: 'Ab', keyLabel: 'Ab2', octave: 2 },
  { vexNote: 'Bb/2', name: 'Bb', keyLabel: 'Bb2', octave: 2 },
  { vexNote: 'C#/3', name: 'C#', keyLabel: 'C#3', octave: 3 },
  { vexNote: 'Eb/3', name: 'Eb', keyLabel: 'Eb3', octave: 3 },
  { vexNote: 'F#/3', name: 'F#', keyLabel: 'F#3', octave: 3 },
  { vexNote: 'Ab/3', name: 'Ab', keyLabel: 'Ab3', octave: 3 },
  { vexNote: 'Bb/3', name: 'Bb', keyLabel: 'Bb3', octave: 3 },
]

const LEVEL_NOTE_COUNT: Record<Level, number> = {
  beginner: 9,
  intermediate: 13,
  advanced: 100, // use all notes (full chromatic)
}

export const TOTAL_QUESTIONS = 20

const pickNotes = (all: NoteDefinition[], count: number): NoteDefinition[] => all.slice(0, count)

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const generateQuestions = (level: Level, clef: Clef): Question[]  => {
  const pool = clef === 'treble' ? TREBLE_NOTES : BASS_NOTES
  const notes = pickNotes(pool, LEVEL_NOTE_COUNT[level])
  // Ensure each note appears at least once, then fill up to TOTAL_QUESTIONS
  const base = shuffle(notes).slice(0, TOTAL_QUESTIONS)
  const extra = Array.from({ length: Math.max(0, TOTAL_QUESTIONS - base.length) }, () =>
    notes[Math.floor(Math.random() * notes.length)]
  )
  return shuffle([...base, ...extra])
    .slice(0, TOTAL_QUESTIONS)
    .map((note) => ({ note, clef }))
}

export const getKeyboardNotes = (level: Level, clef: Clef): NoteDefinition[] => {
  const pool = clef === 'treble' ? TREBLE_NOTES : BASS_NOTES
  return pickNotes(pool, LEVEL_NOTE_COUNT[level])
}
