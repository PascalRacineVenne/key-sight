import { useState, useCallback } from "react";
import { Button, Progress, Typography } from "antd";
import NoteStaff from "./NoteStaff";
import PianoKeyboard from "./PianoKeyboard";
import type { Answer, Clef, Feedback, Level, Question } from "../types";
import { getKeyboardNotes, TOTAL_QUESTIONS } from "../gameLogic";

const { Text } = Typography;

interface Props {
  level: Level;
  clef: Clef;
  questions: Question[];
  onFinish: (answers: Answer[]) => void;
}

export const FEEDBACK_OPTIONS: Record<string, Feedback> = {
  NONE: "none",
  CORRECT: "correct",
  INCORRECT: "incorrect",
};

const GameScreen = ({ level, clef, questions, onFinish }: Props) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(FEEDBACK_OPTIONS.NONE);

  const current = questions[index];
  const keyboardNotes = getKeyboardNotes(level, clef);

  const handleSelect = useCallback(
    (keyLabel: string) => {
      if (feedback !== FEEDBACK_OPTIONS.NONE) return;
      const correct = keyLabel === current.note.keyLabel;
      setSelectedKey(keyLabel);
      setFeedback(
        correct ? FEEDBACK_OPTIONS.CORRECT : FEEDBACK_OPTIONS.INCORRECT,
      );
    },
    [feedback, current],
  );

  const handleNext = () => {
    const newAnswer: Answer = {
      question: current,
      selected: selectedKey,
      correct: selectedKey === current.note.keyLabel,
    };
    const newAnswers = [...answers, newAnswer];

    if (index + 1 >= TOTAL_QUESTIONS) {
      onFinish(newAnswers);
    } else {
      setAnswers(newAnswers);
      setIndex(index + 1);
      setSelectedKey(null);
      setFeedback(FEEDBACK_OPTIONS.NONE);
    }
  };

  const progressPercent = Math.round((index / TOTAL_QUESTIONS) * 100);

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        padding: "12px 16px",
        gap: 12,
        background: "#f5f5f5",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          margin: "0 auto",
          alignItems: "center",
          gap: 12,
          width: "50%",
        }}
      >
        <Text type="secondary" style={{ whiteSpace: "nowrap", fontSize: 13 }}>
          {index + 1} / {TOTAL_QUESTIONS}
        </Text>
        <Progress
          percent={progressPercent}
          showInfo={false}
          style={{ flex: 1, margin: 0 }}
        />
        <Text
          type="secondary"
          style={{
            whiteSpace: "nowrap",
            fontSize: 13,
            textTransform: "capitalize",
          }}
        >
          {level}
        </Text>
      </div>

      {/* Staff */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <NoteStaff question={current} feedback={feedback} />

        {feedback !== FEEDBACK_OPTIONS.NONE && (
          <div
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: 600,
              color: feedback === "correct" ? "#52c41a" : "#ff4d4f",
            }}
          >
            {feedback === FEEDBACK_OPTIONS.CORRECT
              ? "Correct!"
              : `Incorrect — it was ${current.note.name}`}
          </div>
        )}
      </div>

      {/* Keyboard */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "16px 8px 12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          overflowX: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PianoKeyboard
          notes={keyboardNotes}
          onSelect={handleSelect}
          disabled={feedback !== FEEDBACK_OPTIONS.NONE}
          selectedKey={selectedKey}
          correctKey={
            feedback !== FEEDBACK_OPTIONS.NONE ? current.note.keyLabel : null
          }
        />
      </div>

      {/* Next button */}
      <Button
        type="primary"
        size="large"
        block
        disabled={feedback === FEEDBACK_OPTIONS.NONE}
        onClick={handleNext}
        style={{ height: 52, fontSize: 17, borderRadius: 12 }}
      >
        {index + 1 >= TOTAL_QUESTIONS ? "See Results" : "Next"}
      </Button>
    </div>
  );
};

export default GameScreen;
