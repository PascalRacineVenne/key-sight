import { Button, Flex, Progress } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import type { Answer, Clef, Level } from "../types";
import { TOTAL_QUESTIONS } from "../gameLogic";
import { COLORS } from "../theme";
import { sharedStyles } from "../sharedStyles";
import { useNoteName } from "../useNoteName";
import { styles } from "./ResultsScreen.styles";

interface Props {
  answers: Answer[];
  level: Level;
  clef: Clef;
  onRestart: () => void;
}

// The color goes on the score ring; the title stays charcoal for legibility
const getGrade = (score: number): { labelId: string; color: string } => {
  const percentage = (score / TOTAL_QUESTIONS) * 100;
  if (percentage === 100)
    return { labelId: "results.gradePerfect", color: COLORS.success };
  if (percentage >= 85)
    return { labelId: "results.gradeExcellent", color: COLORS.success };
  if (percentage >= 70)
    return { labelId: "results.gradeGood", color: COLORS.primary };
  if (percentage >= 50)
    return { labelId: "results.gradeKeepPracticing", color: COLORS.accent };
  return { labelId: "results.gradeKeepGoing", color: COLORS.accent };
};

const ResultsScreen = ({ answers, level, clef, onRestart }: Props) => {
  const intl = useIntl();
  const getNoteName = useNoteName();
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
          <h1 className={styles.title}>
            <FormattedMessage id={grade.labelId} />
          </h1>
          <p className={styles.subtitle}>
            {intl.formatMessage(
              { id: "exercise.summary" },
              {
                level: intl.formatMessage({ id: `level.${level}` }),
                clef: intl.formatMessage({ id: `clef.${clef}` }),
              },
            )}
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
            <h2 className={styles.sectionTitle}>
              <FormattedMessage id="results.notesToReview" />
            </h2>
            <Flex wrap gap={8}>
              {missedSorted.map(([name, count]) => (
                <span key={name} className={styles.missedTag}>
                  <FormattedMessage
                    id="results.missedNote"
                    values={{ note: getNoteName(name), count }}
                  />
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
          <FormattedMessage id="results.playAgainButton" />
        </Button>
      </main>
    </Flex>
  );
};

export default ResultsScreen;
