import type { Clef, Feedback } from "./types";
import { COLORS } from "./theme";

// Correct is a restrained green; wrong answers use the warm accent so a
// mistake reads as "not quite" rather than an alarm.
export const FEEDBACK_COLORS: Record<Exclude<Feedback, "none">, string> = {
  correct: COLORS.success,
  incorrect: COLORS.accent,
};

// Darker shades of the feedback colors, for text on white
export const FEEDBACK_TEXT_COLORS: Record<Exclude<Feedback, "none">, string> = {
  correct: COLORS.successText,
  incorrect: COLORS.accentText,
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
// Measured in Chrome, the notes' ink spans from 7.8 units above the stave's
// y position (the flat on Eb6) to 123.8 below it (the sharp on F#3).
// STAFF_OFFSET_Y and the height fit that range with 2 units to spare at
// each end; lowering either clips those notes.
//
// Width: at least ~120 so the clef, an accidental and the note don't
// collide. A wider staff means less zoom: its on-screen height is fixed
// by the screen height, and the width follows from width:height.
export const STAFF_SIZE = { width: 140, height: 136 };
export const STAFF_OFFSET_Y = 10;
