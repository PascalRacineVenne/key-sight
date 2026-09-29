import type { Clef, Feedback } from "./types";

export const FEEDBACK_COLORS: Record<Exclude<Feedback, "none">, string> = {
  correct: "#52c41a",
  incorrect: "#ff4d4f",
};

export const CLEF_TYPE = {
  TREBLE: "treble",
  BASS: "bass",
} as const satisfies Record<string, Clef>;

// How long the answer feedback stays up before the next question.
// The player can adjust it with the slider on the game screen.
export const NEXT_QUESTION_DELAY_MS = {
  min: 250,
  max: 2000,
  step: 250,
  default: 1000,
  // Wrong answers stay up at least this long so the player can read the correction
  minAfterIncorrect: 1000,
} as const;

// Staff drawing area in VexFlow units: just wide enough for a clef and
// one note, and tall enough for three ledger lines above and below.
// The SVG is scaled up from this size, so smaller means more zoomed in.
//
// Ratio: keep width:height at about 1:1 to 1.1:1 (currently 140:130 ≈ 1.08).
// - height: keep at 130. The note centers span 100 units (E6 to F3 in
//   treble), plus the staff's y offset and the note head. Less clips notes.
// - width: at least ~120 so the clef, an accidental and the note don't
//   collide. A wider staff means less zoom: its on-screen height is fixed
//   at 40% of the screen, and the width follows from this ratio.
export const STAFF_SIZE = { width: 140, height: 130 };
