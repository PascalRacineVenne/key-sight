import { useState } from "react";
import { Button, Flex } from "antd";
import { VexFlow } from "vexflow";
import { cx } from "@linaria/core";
import type { Clef, Level } from "../types";
import { CLEF_TYPE } from "../constants";
import { TOTAL_QUESTIONS } from "../gameLogic";
import ChoiceGroup from "./ChoiceGroup";
import { sharedStyles } from "../sharedStyles";
import { styles } from "./MenuScreen.styles";

const LEVEL_OPTIONS: Record<string, Level> = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
};

const CLEF_CHOICES = [
  {
    value: CLEF_TYPE.TREBLE,
    ariaLabel: "Treble clef",
    content: (
      <span aria-hidden className={cx(styles.clef, styles.trebleClef)}>
        {VexFlow.Glyphs.gClef}
      </span>
    ),
  },
  {
    value: CLEF_TYPE.BASS,
    ariaLabel: "Bass clef",
    content: (
      <span aria-hidden className={cx(styles.clef, styles.bassClef)}>
        {VexFlow.Glyphs.fClef}
      </span>
    ),
  },
];

const LEVEL_CHOICES = [
  {
    value: LEVEL_OPTIONS.BEGINNER,
    name: "Beginner",
    description: "Staff notes only",
  },
  {
    value: LEVEL_OPTIONS.INTERMEDIATE,
    name: "Intermediate",
    description: "+ Ledger lines",
  },
  {
    value: LEVEL_OPTIONS.ADVANCED,
    name: "Advanced",
    description: "+ Accidentals",
  },
].map(({ value, name, description }) => ({
  value,
  content: (
    <>
      <span className={styles.levelName}>{name}</span>
      <span className={styles.levelDescription}>{description}</span>
    </>
  ),
}));

interface Props {
  onStart: (level: Level, clef: Clef) => void;
}

const MenuScreen = ({ onStart }: Props) => {
  const [level, setLevel] = useState<Level>(LEVEL_OPTIONS.ADVANCED);
  const [clef, setClef] = useState<Clef>(CLEF_TYPE.TREBLE);

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      className={sharedStyles.centeredScreen}
    >
      <main className={sharedStyles.card}>
        <header className={styles.header}>
          <h1 className={styles.wordmark}>
            Key<span className={styles.wordmarkSight}>Sight</span>
          </h1>
          <p className={styles.subtitle}>Sight-reading practice</p>
        </header>

        <ChoiceGroup
          name="clef"
          legend="Clef"
          value={clef}
          options={CLEF_CHOICES}
          onChange={setClef}
          className={styles.clefOptions}
          optionClassName={styles.clefOption}
        />

        <ChoiceGroup
          name="level"
          legend="Level"
          value={level}
          options={LEVEL_CHOICES}
          onChange={setLevel}
          className={styles.levelOptions}
          optionClassName={styles.levelOption}
        />

        <Button
          type="primary"
          size="large"
          block
          className={sharedStyles.primaryButton}
          onClick={() => onStart(level, clef)}
        >
          Start ({TOTAL_QUESTIONS} questions)
        </Button>
      </main>
    </Flex>
  );
};

export default MenuScreen;
