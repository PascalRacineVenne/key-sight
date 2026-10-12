import { useState } from "react";
import { Button, Flex } from "antd";
import { VexFlow } from "vexflow";
import { cx } from "@linaria/core";
import { FormattedMessage, useIntl } from "react-intl";
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
    ariaLabelId: "clef.treble",
    content: (
      <span aria-hidden className={cx(styles.clef, styles.trebleClef)}>
        {VexFlow.Glyphs.gClef}
      </span>
    ),
  },
  {
    value: CLEF_TYPE.BASS,
    ariaLabelId: "clef.bass",
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
    nameId: "level.beginner",
    descriptionId: "level.beginnerDescription",
  },
  {
    value: LEVEL_OPTIONS.INTERMEDIATE,
    nameId: "level.intermediate",
    descriptionId: "level.intermediateDescription",
  },
  {
    value: LEVEL_OPTIONS.ADVANCED,
    nameId: "level.advanced",
    descriptionId: "level.advancedDescription",
  },
].map(({ value, nameId, descriptionId }) => ({
  value,
  content: (
    <>
      <span className={styles.levelName}>
        <FormattedMessage id={nameId} />
      </span>
      <span className={styles.levelDescription}>
        <FormattedMessage id={descriptionId} />
      </span>
    </>
  ),
}));

interface Props {
  onStart: (level: Level, clef: Clef) => void;
}

const MenuScreen = ({ onStart }: Props) => {
  const intl = useIntl();
  const [level, setLevel] = useState<Level>(LEVEL_OPTIONS.ADVANCED);
  const [clef, setClef] = useState<Clef>(CLEF_TYPE.TREBLE);

  const clefOptions = CLEF_CHOICES.map(({ ariaLabelId, ...option }) => ({
    ...option,
    ariaLabel: intl.formatMessage({ id: ariaLabelId }),
  }));

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
          <p className={styles.subtitle}>
            <FormattedMessage id="menu.subtitle" />
          </p>
        </header>

        <ChoiceGroup
          name="clef"
          legend={intl.formatMessage({ id: "menu.clefLegend" })}
          value={clef}
          options={clefOptions}
          onChange={setClef}
          className={styles.clefOptions}
          optionClassName={styles.clefOption}
        />

        <ChoiceGroup
          name="level"
          legend={intl.formatMessage({ id: "menu.levelLegend" })}
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
          <FormattedMessage
            id="menu.startButton"
            values={{ count: TOTAL_QUESTIONS }}
          />
        </Button>
      </main>
    </Flex>
  );
};

export default MenuScreen;
