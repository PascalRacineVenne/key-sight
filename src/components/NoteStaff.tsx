import { useEffect, useRef } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  Accidental,
} from "vexflow";
import type { Feedback, Question } from "../types";
import { FEEDBACK_OPTIONS } from "./GameScreen";
import { styles } from "./NoteStaff.styles";

interface Props {
  question: Question;
  feedback: Feedback;
}

const NoteStaff = ({ question, feedback }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const width = container.clientWidth || 320;
    const height = 160;

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(width, height);
    const context = renderer.getContext();
    context.setFont("Arial", 10);

    const stave = new Stave(10, 20, width - 20);
    stave.addClef(question.clef);
    stave.setContext(context).draw();

    // Parse vexNote like "F#/4" → keys: ["f#/4"], accidental on 0 if needed
    const raw = question.note.vexNote.toLowerCase();
    const keys = [raw];

    const note = new StaveNote({
      keys,
      duration: "w",
      clef: question.clef,
    });

    // Add accidental if needed
    const noteName = question.note.vexNote;
    if (noteName.includes("#")) {
      note.addModifier(new Accidental("#"), 0);
    } else if (noteName.toLowerCase().includes("b") && noteName.length > 2) {
      // "Bb/4" — only add flat if there's a 'b' after the note letter
      const letter = noteName[0].toLowerCase();
      if (letter !== "b" || noteName[1] === "b") {
        note.addModifier(new Accidental("b"), 0);
      }
    }

    // Color for feedback
    if (feedback === FEEDBACK_OPTIONS.CORRECT) {
      note.setStyle({ fillStyle: "#52c41a", strokeStyle: "#52c41a" });
    } else if (feedback === FEEDBACK_OPTIONS.INCORRECT) {
      note.setStyle({ fillStyle: "#ff4d4f", strokeStyle: "#ff4d4f" });
    }

    const voice = new Voice({ numBeats: 4, beatValue: 4 });
    voice.addTickable(note);

    new Formatter().joinVoices([voice]).format([voice], width - 80);
    voice.draw(context, stave);
  }, [question, feedback]);

  return <div ref={containerRef} className={styles.staff} />;
};

export default NoteStaff;
