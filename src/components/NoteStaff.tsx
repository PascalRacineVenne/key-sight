import { useEffect, useId, useRef } from "react";
import { Factory } from "vexflow";
import type { Feedback, Question } from "../types";
import { FEEDBACK_COLORS, STAFF_OFFSET_Y, STAFF_SIZE } from "../constants";
import { COLORS } from "../theme";
import { styles } from "./NoteStaff.styles";

interface Props {
  question: Question;
  feedback: Feedback;
}

const NoteStaff = ({ question, feedback }: Props) => {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const factory = new Factory({
      renderer: { elementId: id, ...STAFF_SIZE },
    });
    const score = factory.EasyScore();

    // Charcoal rather than pure black for the staff, clef and note
    factory.getContext().setFillStyle(COLORS.text).setStrokeStyle(COLORS.text);

    const notes = score.notes(`${question.note.keyLabel}/w`, {
      clef: question.clef,
    });

    if (feedback !== "none") {
      const color = FEEDBACK_COLORS[feedback];
      notes[0].setStyle({ fillStyle: color, strokeStyle: color });
    }

    factory
      .System({ x: 5, y: STAFF_OFFSET_Y, width: STAFF_SIZE.width - 10 })
      .addStave({ voices: [score.voice(notes)] })
      .addClef(question.clef, "small");

    factory.draw();

    // VexFlow sets a fixed inline size on the SVG; clear it so CSS can scale it
    const svg = container.querySelector("svg");
    svg?.style.removeProperty("width");
    svg?.style.removeProperty("height");
  }, [id, question, feedback]);

  return <div id={id} ref={containerRef} className={styles.staff} />;
};

export default NoteStaff;
