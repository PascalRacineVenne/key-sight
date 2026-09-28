import { useState, useCallback } from "react";
import { Button, Flex, Progress, Typography } from "antd";
import { cx } from "@linaria/core";
import NoteStaff from "./NoteStaff";
import PianoKeyboard from "./PianoKeyboard";
import type { Answer, Clef, Feedback, Level, Question } from "../types";
import { getKeyboardNotes, TOTAL_QUESTIONS } from "../gameLogic";
import { styles } from "./GameScreen.styles";

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
    <Flex vertical gap={12} className={styles.screen}>
      {/* Header */}
      <Flex align="center" gap={12} className={styles.header}>
        <Text type="secondary" className={styles.meta}>
          {index + 1} / {TOTAL_QUESTIONS}
        </Text>
        <Progress
          percent={progressPercent}
          showInfo={false}
          className={styles.progress}
        />
        <Text type="secondary" className={cx(styles.meta, styles.capitalize)}>
          {level}
        </Text>
      </Flex>

      {/* Staff */}
      <Flex vertical justify="center" gap={8} flex={1}>
        <NoteStaff question={current} feedback={feedback} />

        {feedback !== FEEDBACK_OPTIONS.NONE && (
          <div
            className={cx(
              styles.feedback,
              feedback === FEEDBACK_OPTIONS.CORRECT
                ? styles.correct
                : styles.incorrect,
            )}
          >
            {feedback === FEEDBACK_OPTIONS.CORRECT
              ? "Correct!"
              : `Incorrect — it was ${current.note.name}`}
          </div>
        )}
      </Flex>

      {/* Keyboard */}
      <Flex justify="center" className={styles.keyboardPanel}>
        <PianoKeyboard
          notes={keyboardNotes}
          onSelect={handleSelect}
          disabled={feedback !== FEEDBACK_OPTIONS.NONE}
          selectedKey={selectedKey}
          correctKey={
            feedback !== FEEDBACK_OPTIONS.NONE ? current.note.keyLabel : null
          }
        />
      </Flex>

      {/* Next button */}
      <Button
        type="primary"
        size="large"
        block
        disabled={feedback === FEEDBACK_OPTIONS.NONE}
        onClick={handleNext}
        className={styles.nextButton}
      >
        {index + 1 >= TOTAL_QUESTIONS ? "See Results" : "Next"}
      </Button>
    </Flex>
  );
};

export default GameScreen;
