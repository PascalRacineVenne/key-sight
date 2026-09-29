import { Button, Flex, Progress } from "antd";
import type { Answer, Clef, Level } from "../types";
import { TOTAL_QUESTIONS } from "../gameLogic";
import { COLORS } from "../theme";
import { sharedStyles } from "../sharedStyles";
import { styles } from "./ResultsScreen.styles";

interface Props {
  answers: Answer[];
  level: Level;
  clef: Clef;
  onRestart: () => void;
}

// The color goes on the score ring; the title stays charcoal for legibility
const getGrade = (score: number): { label: string; color: string } => {
  const percentage = (score / TOTAL_QUESTIONS) * 100;
  if (percentage === 100) return { label: "Perfect!", color: COLORS.success };
  if (percentage >= 85) return { label: "Excellent", color: COLORS.success };
  if (percentage >= 70) return { label: "Good", color: COLORS.primary };
  if (percentage >= 50)
    return { label: "Keep practicing", color: COLORS.accent };
  return { label: "Keep going!", color: COLORS.accent };
};

const ResultsScreen = ({ answers, level, clef, onRestart }: Props) => {
  const score = answers.filter((answer) => answer.correct).length;
  const percent = Math.round((score / TOTAL_QUESTIONS) * 100);
  const grade = getGrade(score);

  const missed = answers
    .filter((answer) => !answer.correct)
    .reduce<Record<string, number>>((missedCounts, answer) => {
      const noteName = answer.question.note.name;
      missedCounts[noteName] = (missedCounts[noteName] ?? 0) + 1;
      return missedCounts;
    }, {});

  const missedSorted = Object.entries(missed)
    .sort((leftEntry, rightEntry) => rightEntry[1] - leftEntry[1])
    .slice(0, 3);

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      className={sharedStyles.centeredScreen}
    >
      <main className={sharedStyles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>{grade.label}</h1>
          <p className={styles.subtitle}>
            {level} · {clef} clef
          </p>
        </header>

        <Flex justify="center">
          <Progress
            type="circle"
            percent={percent}
            strokeColor={grade.color}
            format={() => `${score}/${TOTAL_QUESTIONS}`}
            size={128}
            className={styles.score}
          />
        </Flex>

        {missedSorted.length > 0 && (
          <section>
            <h2 className={styles.sectionTitle}>Notes to review</h2>
            <Flex wrap gap={8}>
              {missedSorted.map(([name, count]) => (
                <span key={name} className={styles.missedTag}>
                  {name} ×{count}
                </span>
              ))}
            </Flex>
          </section>
        )}

        <Button
          type="primary"
          size="large"
          block
          className={sharedStyles.primaryButton}
          onClick={onRestart}
        >
          Play Again
        </Button>
      </main>
    </Flex>
  );
};

export default ResultsScreen;
