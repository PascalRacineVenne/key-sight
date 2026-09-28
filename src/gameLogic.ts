import type { Clef, Level, NoteDefinition, Question } from "./types";

const TREBLE_NOTES: NoteDefinition[] = [
  // Beginner: lines and spaces of treble clef (E4–F5)
  { name: "E", keyLabel: "E4", octave: 4 },
  { name: "F", keyLabel: "F4", octave: 4 },
  { name: "G", keyLabel: "G4", octave: 4 },
  { name: "A", keyLabel: "A4", octave: 4 },
  { name: "B", keyLabel: "B4", octave: 4 },
  { name: "C", keyLabel: "C5", octave: 5 },
  { name: "D", keyLabel: "D5", octave: 5 },
  { name: "E", keyLabel: "E5", octave: 5 },
  { name: "F", keyLabel: "F5", octave: 5 },
  // Intermediate adds ledger lines
  { name: "D", keyLabel: "D4", octave: 4 },
  { name: "C", keyLabel: "C4", octave: 4 },
  { name: "G", keyLabel: "G5", octave: 5 },
  { name: "A", keyLabel: "A5", octave: 5 },
  // Advanced: full chromatic (all accidentals in C4–A5 range)
  { name: "F", keyLabel: "F3", octave: 3 },
  { name: "F#", keyLabel: "F#3", octave: 3 },
  { name: "G", keyLabel: "G3", octave: 3 },
  { name: "G#", keyLabel: "G#3", octave: 3 },
  { name: "A", keyLabel: "A3", octave: 3 },
  { name: "Bb", keyLabel: "Bb3", octave: 3 },
  { name: "B", keyLabel: "B3", octave: 3 },
  { name: "C#", keyLabel: "C#4", octave: 4 },
  { name: "Eb", keyLabel: "Eb4", octave: 4 },
  { name: "F#", keyLabel: "F#4", octave: 4 },
  { name: "Ab", keyLabel: "Ab4", octave: 4 },
  { name: "Bb", keyLabel: "Bb4", octave: 4 },
  { name: "C#", keyLabel: "C#5", octave: 5 },
  { name: "Eb", keyLabel: "Eb5", octave: 5 },
  { name: "F#", keyLabel: "F#5", octave: 5 },
  { name: "Ab", keyLabel: "Ab5", octave: 5 },
  { name: "Bb", keyLabel: "Bb5", octave: 5 },
  { name: "B", keyLabel: "B5", octave: 5 },
  { name: "C", keyLabel: "C6", octave: 6 },
  { name: "C#", keyLabel: "C#6", octave: 6 },
  { name: "D", keyLabel: "D6", octave: 6 },
  { name: "E", keyLabel: "E6", octave: 6 },
  { name: "Eb", keyLabel: "Eb6", octave: 6 },
];

const BASS_NOTES: NoteDefinition[] = [
  // Beginner: lines and spaces of bass clef (G2–A3)
  { name: "G", keyLabel: "G2", octave: 2 },
  { name: "A", keyLabel: "A2", octave: 2 },
  { name: "B", keyLabel: "B2", octave: 2 },
  { name: "C", keyLabel: "C3", octave: 3 },
  { name: "D", keyLabel: "D3", octave: 3 },
  { name: "E", keyLabel: "E3", octave: 3 },
  { name: "F", keyLabel: "F3", octave: 3 },
  { name: "G", keyLabel: "G3", octave: 3 },
  { name: "A", keyLabel: "A3", octave: 3 },
  // Intermediate
  { name: "F", keyLabel: "F2", octave: 2 },
  { name: "E", keyLabel: "E2", octave: 2 },
  { name: "B", keyLabel: "B3", octave: 3 },
  { name: "C", keyLabel: "C4", octave: 4 },
  // Advanced: full chromatic (B1–F4)
  // — extension below E2
  // { name: 'Bb', keyLabel: 'Bb1', octave: 1 },
  { name: "B", keyLabel: "B1", octave: 1 },
  { name: "C", keyLabel: "C2", octave: 2 },
  { name: "C#", keyLabel: "C#2", octave: 2 },
  { name: "D", keyLabel: "D2", octave: 2 },
  { name: "Eb", keyLabel: "Eb2", octave: 2 },
  // — accidentals in E2–C4 range
  { name: "F#", keyLabel: "F#2", octave: 2 },
  { name: "Ab", keyLabel: "Ab2", octave: 2 },
  { name: "Bb", keyLabel: "Bb2", octave: 2 },
  { name: "C#", keyLabel: "C#3", octave: 3 },
  { name: "Eb", keyLabel: "Eb3", octave: 3 },
  { name: "F#", keyLabel: "F#3", octave: 3 },
  { name: "Ab", keyLabel: "Ab3", octave: 3 },
  { name: "Bb", keyLabel: "Bb3", octave: 3 },
  // — extension above C4
  { name: "C#", keyLabel: "C#4", octave: 4 },
  { name: "D", keyLabel: "D4", octave: 4 },
  { name: "Eb", keyLabel: "Eb4", octave: 4 },
  { name: "E", keyLabel: "E4", octave: 4 },
  { name: "F", keyLabel: "F4", octave: 4 },
];

const LEVEL_NOTE_COUNT: Record<Level, number> = {
  beginner: 9,
  intermediate: 13,
  advanced: 100, // use all notes (full chromatic)
};

export const TOTAL_QUESTIONS = 20;

const pickNotes = (all: NoteDefinition[], count: number): NoteDefinition[] =>
  all.slice(0, count);

const shuffle = <T>(items: T[]): T[] => {
  const shuffledItems = [...items];
  for (let index = shuffledItems.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }
  return shuffledItems;
};

export const generateQuestions = (level: Level, clef: Clef): Question[] => {
  const pool = clef === "treble" ? TREBLE_NOTES : BASS_NOTES;
  const notes = pickNotes(pool, LEVEL_NOTE_COUNT[level]);
  // Ensure each note appears at least once, then fill up to TOTAL_QUESTIONS
  const base = shuffle(notes).slice(0, TOTAL_QUESTIONS);
  const extra = Array.from(
    { length: Math.max(0, TOTAL_QUESTIONS - base.length) },
    () => notes[Math.floor(Math.random() * notes.length)],
  );
  return shuffle([...base, ...extra])
    .slice(0, TOTAL_QUESTIONS)
    .map((note) => ({ note, clef }));
};

export const getKeyboardNotes = (
  level: Level,
  clef: Clef,
): NoteDefinition[] => {
  const pool = clef === "treble" ? TREBLE_NOTES : BASS_NOTES;
  return pickNotes(pool, LEVEL_NOTE_COUNT[level]);
};
