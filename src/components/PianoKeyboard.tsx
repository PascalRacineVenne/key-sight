import type { CSSProperties } from "react";
import { Flex } from "antd";
import { cx } from "@linaria/core";
import type { NoteDefinition } from "../types";
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
  const sorted = [...notes].sort((a, b) => pitchIndex(a) - pitchIndex(b));
  const whiteKeys = sorted.filter((n) => !isBlack(n.name));
  const blackKeys = sorted.filter((n) => isBlack(n.name));

  const keyWidth = Math.min(
    52,
    Math.floor((window.innerWidth - 32) / Math.max(whiteKeys.length, 1)),
  );
  const whiteHeight = keyWidth * 2.8;
  const blackHeight = whiteHeight * 0.6;
  const blackWidth = keyWidth * 0.6;

  function getKeyStateClass(note: NoteDefinition) {
    if (note.keyLabel === correctKey && selectedKey !== null)
      return styles.correct;
    if (note.keyLabel === selectedKey && note.keyLabel !== correctKey)
      return styles.incorrect;
    return null;
  }

  // Map black key to position between white keys
  function blackKeyLeft(note: NoteDefinition): number {
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
    if (!leftName) return 0;
    const idx = whiteKeys.findIndex(
      (w) => w.name === leftName && w.octave === octave,
    );
    if (idx === -1) return -999;
    return idx * keyWidth + keyWidth - blackWidth / 2;
  }

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
          disabled={disabled}
          onClick={() => onSelect(note.keyLabel)}
          className={cx(styles.whiteKey, getKeyStateClass(note))}
        >
          {note.name}
          {note.keyLabel === "C4" && <span className={styles.middleC} />}
        </button>
      ))}

      {/* Black keys */}
      {blackKeys.map((note) => {
        const left = blackKeyLeft(note);
        if (left < 0) return null;
        const stateClass = getKeyStateClass(note);
        return (
          <button
            key={note.keyLabel}
            disabled={disabled}
            onClick={() => onSelect(note.keyLabel)}
            className={cx(
              styles.blackKey,
              stateClass,
              stateClass && styles.blackKeyHighlighted,
            )}
            style={{ left }}
          >
            {note.name}
          </button>
        );
      })}
    </Flex>
  );
};

export default PianoKeyboard;
