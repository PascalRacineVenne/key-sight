import { useState, useCallback } from "react";
import { Button, Progress, Typography } from "antd";
import NoteStaff from "./NoteStaff";
import PianoKeyboard from "./PianoKeyboard";
import type { Answer, Clef, Level, Question } from "../types";
import { getKeyboardNotes, TOTAL_QUESTIONS } from "../gameLogic";

const { Text } = Typography;

interface Props {
  level: Level;
  clef: Clef;
  questions: Question[];
  onFinish: (answers: Answer[]) => void;
}

type Feedback = "none" | "correct" | "incorrect";

const GameScreen = ({ level, clef, questions, onFinish }: Props) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>("none");

  const current = questions[index];
  const keyboardNotes = getKeyboardNotes(level, clef);

  const handleSelect = useCallback(
    (keyLabel: string) => {
      if (feedback !== "none") return;
      const correct = keyLabel === current.note.keyLabel;
      setSelectedKey(keyLabel);
      setFeedback(correct ? "correct" : "incorrect");
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
      setFeedback("none");
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

        {feedback !== "none" && (
          <div
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: 600,
              color: feedback === "correct" ? "#52c41a" : "#ff4d4f",
            }}
          >
            {feedback === "correct"
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
          disabled={feedback !== "none"}
          selectedKey={selectedKey}
          correctKey={feedback !== "none" ? current.note.keyLabel : null}
        />
      </div>

      {/* Next button */}
      <Button
        type="primary"
        size="large"
        block
        disabled={feedback === "none"}
        onClick={handleNext}
        style={{ height: 52, fontSize: 17, borderRadius: 12 }}
      >
        {index + 1 >= TOTAL_QUESTIONS ? "See Results" : "Next"}
      </Button>
    </div>
  );
};

export default GameScreen;
