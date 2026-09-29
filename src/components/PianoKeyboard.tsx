import type { CSSProperties } from "react";
import { Flex } from "antd";
import { cx } from "@linaria/core";
import type { NoteDefinition } from "../types";
import { playNote } from "../audio";
import { styles } from "./PianoKeyboard.styles";

interface Props {
  notes: NoteDefinition[];
  onSelect: (keyLabel: string) => void;
  disabled: boolean;
  selectedKey: string | null;
  correctKey: string | null;
}

const CHROMATIC_ORDER: Record<string, number> = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
};

const BLACK_KEY_SIZE_RATIO = 0.6;

const pitchIndex = (note: NoteDefinition) =>
  note.octave * 12 + (CHROMATIC_ORDER[note.name] ?? 0);

const isBlack = (name: string) =>
  name.length > 1 && (name.includes("#") || name.includes("b"));

const PianoKeyboard = ({
  notes,
  onSelect,
  disabled,
  selectedKey,
  correctKey,
}: Props) => {
  const sorted = [...notes].sort(
    (leftNote, rightNote) => pitchIndex(leftNote) - pitchIndex(rightNote),
  );
  const whiteKeys = sorted.filter((note) => !isBlack(note.name));
  const blackKeys = sorted.filter((note) => isBlack(note.name));

  const keyWidth = 52;
  const whiteHeight = keyWidth * 2.8;
  const blackHeight = whiteHeight * BLACK_KEY_SIZE_RATIO;
  const blackWidth = keyWidth * BLACK_KEY_SIZE_RATIO;

  const handlePress = (note: NoteDefinition) => {
    void playNote(note.keyLabel);
    onSelect(note.keyLabel);
  };

  const getKeyState = (note: NoteDefinition) => {
    if (note.keyLabel === correctKey && selectedKey !== null) return "correct";
    if (note.keyLabel === selectedKey && note.keyLabel !== correctKey)
      return "incorrect";
    return null;
  };

  // Map black key to position between white keys
  const blackKeyLeft = (note: NoteDefinition): number | null => {
    const name = note.name.replace(/\d/, "");
    const octave = note.octave;
    // find the white key to the left
    const leftWhiteMap: Record<string, string> = {
      "C#": "C",
      Db: "C",
      "D#": "D",
      Eb: "D",
      "F#": "F",
      Gb: "F",
      "G#": "G",
      Ab: "G",
      "A#": "A",
      Bb: "A",
    };
    const leftName = leftWhiteMap[name];
    if (!leftName) return null;
    const idx = whiteKeys.findIndex(
      (whiteKey) => whiteKey.name === leftName && whiteKey.octave === octave,
    );
    if (idx === -1) return null;
    return idx * keyWidth + keyWidth - blackWidth / 2;
  };

  const sizeVars = {
    "--key-width": `${keyWidth}px`,
    "--white-height": `${whiteHeight}px`,
    "--black-width": `${blackWidth}px`,
    "--black-height": `${blackHeight}px`,
  } as CSSProperties;

  return (
    <Flex className={styles.keyboard} style={sizeVars}>
      {/* White keys */}
      {whiteKeys.map((note) => (
        <button
          key={note.keyLabel}
          aria-label={note.keyLabel}
          disabled={disabled}
          onClick={() => handlePress(note)}
          className={cx(
            styles.whiteKey,
            getKeyState(note) === "correct" && styles.correct,
            getKeyState(note) === "incorrect" && styles.incorrect,
          )}
        >
          {note.keyLabel}
          {note.keyLabel === "C4" && <span className={styles.middleC} />}
        </button>
      ))}

      {/* Black keys */}
      {blackKeys.map((note) => {
        const left = blackKeyLeft(note);
        if (left === null) return null;
        const keyState = getKeyState(note);
        return (
          <button
            key={note.keyLabel}
            aria-label={note.keyLabel}
            disabled={disabled}
            onClick={() => handlePress(note)}
            className={cx(
              styles.blackKey,
              keyState === "correct" && styles.blackCorrect,
              keyState === "incorrect" && styles.blackIncorrect,
            )}
            style={{ left }}
          >
            {note.keyLabel}
          </button>
        );
      })}
    </Flex>
  );
};

export default PianoKeyboard;
