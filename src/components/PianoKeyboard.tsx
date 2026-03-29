import type { NoteDefinition } from "../types";

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

  function getKeyColor(note: NoteDefinition, baseWhite: boolean) {
    if (note.keyLabel === correctKey && selectedKey !== null) return "#52c41a";
    if (note.keyLabel === selectedKey && note.keyLabel !== correctKey)
      return "#ff4d4f";
    return baseWhite ? "#fff" : "#222";
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

  return (
    <div
      style={{
        position: "relative",
        height: whiteHeight + 2,
        display: "flex",
        touchAction: "manipulation",
      }}
    >
      {/* White keys */}
      {whiteKeys.map((note) => (
        <button
          key={note.keyLabel}
          disabled={disabled}
          onClick={() => onSelect(note.keyLabel)}
          style={{
            width: keyWidth,
            height: whiteHeight,
            background: getKeyColor(note, true),
            border: "1px solid #bbb",
            borderRadius: "0 0 6px 6px",
            cursor: disabled ? "default" : "pointer",
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 4,
            fontSize: 10,
            fontWeight: 600,
            color: "#555",
            transition: "background 0.15s",
          }}
        >
          {note.name}
          {note.keyLabel === "C4" && (
            <span
              style={{
                position: "absolute",
                bottom: 24,
                left: "50%",
                transform: "translateX(-50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#1163c7",
                pointerEvents: "none",
              }}
            />
          )}
        </button>
      ))}

      {/* Black keys */}
      {blackKeys.map((note) => {
        const left = blackKeyLeft(note);
        if (left < 0) return null;
        return (
          <button
            key={note.keyLabel}
            disabled={disabled}
            onClick={() => onSelect(note.keyLabel)}
            style={{
              position: "absolute",
              left,
              top: 0,
              width: blackWidth,
              height: blackHeight,
              background: getKeyColor(note, false),
              border: "1px solid #000",
              borderRadius: "0 0 4px 4px",
              cursor: disabled ? "default" : "pointer",
              zIndex: 2,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 2,
              fontSize: 8,
              fontWeight: 600,
              color:
                getKeyColor(note, false) === "#52c41a"
                  ? "#fff"
                  : getKeyColor(note, false) === "#ff4d4f"
                    ? "#fff"
                    : "#ccc",
              transition: "background 0.15s",
            }}
          >
            {note.name}
          </button>
        );
      })}
    </div>
  );
};

export default PianoKeyboard;
