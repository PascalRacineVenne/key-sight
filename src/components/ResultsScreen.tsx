import { Button, Card, Flex, Progress, Space, Typography } from "antd";
import type { Answer, Clef, Level } from "../types";
import { TOTAL_QUESTIONS } from "../gameLogic";
import { FEEDBACK_COLORS } from "../constants";
import { styles } from "./ResultsScreen.styles";

const { Title, Text } = Typography;

interface Props {
  answers: Answer[];
  level: Level;
  clef: Clef;
  onRestart: () => void;
}

const getGrade = (score: number): { label: string; color: string } => {
  const percentage = (score / TOTAL_QUESTIONS) * 100;
  if (percentage === 100) return { label: "Perfect!", color: "#722ed1" };
  if (percentage >= 85)
    return { label: "Excellent", color: FEEDBACK_COLORS.correct };
  if (percentage >= 70) return { label: "Good", color: "#1677ff" };
  if (percentage >= 50) return { label: "Keep practicing", color: "#fa8c16" };
  return { label: "Keep going!", color: FEEDBACK_COLORS.incorrect };
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
    <Flex vertical align="center" justify="center" className={styles.screen}>
      <Card className={styles.card}>
        <Space direction="vertical" size="large" className={styles.content}>
          <div>
            <Title
              level={2}
              className={styles.title}
              style={{ color: grade.color }}
            >
              {grade.label}
            </Title>
            <Text type="secondary" className={styles.subtitle}>
              {clef} clef — {level}
            </Text>
          </div>

          <div>
            <Progress
              type="circle"
              percent={percent}
              strokeColor={grade.color}
              format={() => `${score}/${TOTAL_QUESTIONS}`}
              size={120}
            />
          </div>

          {missedSorted.length > 0 && (
            <div className={styles.section}>
              <Text strong>Notes to review:</Text>
              <Flex wrap gap={8} className={styles.missedList}>
                {missedSorted.map(([name, count]) => (
                  <span key={name} className={styles.missedTag}>
                    {name} ×{count}
                  </span>
                ))}
              </Flex>
            </div>
          )}

          <Space direction="vertical" className={styles.actions}>
            <Button
              type="primary"
              size="large"
              block
              className={styles.restartButton}
              onClick={onRestart}
            >
              Play Again
            </Button>
          </Space>
        </Space>
      </Card>
    </Flex>
  );
};

export default ResultsScreen;
