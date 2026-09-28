import { Button, Card, Flex, Progress, Space, Typography } from "antd";
import type { Answer, Clef, Level } from "../types";
import { TOTAL_QUESTIONS } from "../gameLogic";
import { styles } from "./ResultsScreen.styles";

const { Title, Text } = Typography;

interface Props {
  answers: Answer[];
  level: Level;
  clef: Clef;
  onRestart: () => void;
}

const getGrade = (score: number): { label: string; color: string } => {
  const pct = (score / TOTAL_QUESTIONS) * 100;
  if (pct === 100) return { label: "Perfect!", color: "#722ed1" };
  if (pct >= 85) return { label: "Excellent", color: "#52c41a" };
  if (pct >= 70) return { label: "Good", color: "#1677ff" };
  if (pct >= 50) return { label: "Keep practicing", color: "#fa8c16" };
  return { label: "Keep going!", color: "#ff4d4f" };
};

const ResultsScreen = ({ answers, level, clef, onRestart }: Props) => {
  const score = answers.filter((a) => a.correct).length;
  const percent = Math.round((score / TOTAL_QUESTIONS) * 100);
  const grade = getGrade(score);

  // Find most missed notes
  const missed = answers
    .filter((a) => !a.correct)
    .reduce<Record<string, number>>((acc, a) => {
      const n = a.question.note.name;
      acc[n] = (acc[n] ?? 0) + 1;
      return acc;
    }, {});

  const missedSorted = Object.entries(missed)
    .sort((a, b) => b[1] - a[1])
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
