import { useState, useCallback, useEffect } from "react";
import { Flex, Progress, Slider, Switch, Typography } from "antd";
import { cx } from "@linaria/core";
import NoteStaff from "./NoteStaff";
import PianoKeyboard from "./PianoKeyboard";
import type { Answer, Clef, Feedback, Level, Question } from "../types";
import { getKeyboardNotes, TOTAL_QUESTIONS } from "../gameLogic";
import { NEXT_QUESTION_DELAY_MS } from "../constants";
import { playNote } from "../audio";
import { styles } from "./GameScreen.styles";

const { Text } = Typography;

const formatSeconds = (ms: number) => `${(ms / 1000).toFixed(2)} s`;

interface GameScreenProps {
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

const GameScreen = ({ level, clef, questions, onFinish }: GameScreenProps) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(FEEDBACK_OPTIONS.NONE);
  const [nextDelayMs, setNextDelayMs] = useState<number>(
    NEXT_QUESTION_DELAY_MS.default,
  );
  const [playNoteFirst, setPlayNoteFirst] = useState(true);

  const currentQuestion = questions[index];
  const keyboardNotes = getKeyboardNotes(level, clef);

  useEffect(() => {
    if (feedback !== FEEDBACK_OPTIONS.NONE || !playNoteFirst) return;
    void playNote(currentQuestion.note.keyLabel);
  }, [currentQuestion, feedback, playNoteFirst]);

  const handleSelect = useCallback(
    (keyLabel: string) => {
      if (feedback !== FEEDBACK_OPTIONS.NONE) return;
      const correct = keyLabel === currentQuestion.note.keyLabel;
      setSelectedKey(keyLabel);
      setFeedback(
        correct ? FEEDBACK_OPTIONS.CORRECT : FEEDBACK_OPTIONS.INCORRECT,
      );
    },
    [feedback, currentQuestion],
  );

  // Once answered, move on automatically (or finish after the last question)
  useEffect(() => {
    if (feedback === FEEDBACK_OPTIONS.NONE) return;

    const delayMs =
      feedback === FEEDBACK_OPTIONS.INCORRECT
        ? Math.max(nextDelayMs, NEXT_QUESTION_DELAY_MS.minAfterIncorrect)
        : nextDelayMs;

    const timer = setTimeout(() => {
      const newAnswer: Answer = {
        question: currentQuestion,
        selected: selectedKey,
        correct: selectedKey === currentQuestion.note.keyLabel,
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
    }, delayMs);

    return () => clearTimeout(timer);
  }, [
    feedback,
    currentQuestion,
    selectedKey,
    answers,
    index,
    onFinish,
    nextDelayMs,
  ]);

  const progressPercent = Math.round(((index + 1) / TOTAL_QUESTIONS) * 100);

  return (
    <Flex vertical gap={10} className={styles.screen}>
      {/* Header */}
      <Flex align="center" gap={12} className={styles.header}>
        <Text type="secondary" className={styles.meta}>
          {index + 1} / {TOTAL_QUESTIONS}
        </Text>
        <Progress
          percent={progressPercent}
          showInfo={false}
          className={styles.progress}
          aria-label={`Question ${index + 1} of ${TOTAL_QUESTIONS}`}
        />
        <Text type="secondary" className={cx(styles.meta, styles.capitalize)}>
          {level} · {clef} clef
        </Text>
      </Flex>

      {/* Staff */}
      <Flex
        vertical
        justify="center"
        gap={10}
        flex={1}
        className={styles.playArea}
      >
        <Flex align="center" className={styles.practiceControls}>
          <Flex align="center" gap={12} className={styles.delayControl}>
            <Text type="secondary" className={styles.meta}>
              Next note
            </Text>
            <Slider
              min={NEXT_QUESTION_DELAY_MS.min}
              max={NEXT_QUESTION_DELAY_MS.max}
              step={NEXT_QUESTION_DELAY_MS.step}
              value={nextDelayMs}
              onChange={setNextDelayMs}
              tooltip={{ formatter: (ms) => formatSeconds(ms ?? 0) }}
              aria-label="Delay before next note"
              className={styles.delaySlider}
            />
            <Text
              type="secondary"
              className={cx(styles.meta, styles.delayValue)}
            >
              {formatSeconds(nextDelayMs)}
            </Text>
          </Flex>
          <Flex align="center" gap={8} className={styles.audioControl}>
            <Text type="secondary" className={styles.meta}>
              Play note first
            </Text>
            <Switch
              checked={playNoteFirst}
              onChange={setPlayNoteFirst}
              aria-label="Play each note before answering"
            />
          </Flex>
        </Flex>

        <NoteStaff question={currentQuestion} feedback={feedback} />

        {/* Always rendered with a fixed height so showing the message
            doesn't shift the layout */}
        <div
          aria-live="polite"
          className={cx(
            styles.feedback,
            feedback === FEEDBACK_OPTIONS.CORRECT && styles.correct,
            feedback === FEEDBACK_OPTIONS.INCORRECT && styles.incorrect,
          )}
        >
          {feedback === FEEDBACK_OPTIONS.CORRECT && "Correct!"}
          {feedback === FEEDBACK_OPTIONS.INCORRECT &&
            `Incorrect — it was ${currentQuestion.note.name}`}
        </div>
      </Flex>

      {/* Keyboard */}
      <Flex className={styles.keyboardPanel}>
        <PianoKeyboard
          notes={keyboardNotes}
          onSelect={handleSelect}
          disabled={feedback !== FEEDBACK_OPTIONS.NONE}
          selectedKey={selectedKey}
          correctKey={
            feedback !== FEEDBACK_OPTIONS.NONE
              ? currentQuestion.note.keyLabel
              : null
          }
        />
      </Flex>
    </Flex>
  );
};

export default GameScreen;
