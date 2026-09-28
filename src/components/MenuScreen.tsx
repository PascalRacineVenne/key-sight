import { useState } from "react";
import { Button, Card, Flex, Radio, Space, Typography } from "antd";
import type { Clef, Level } from "../types";
import { styles } from "./MenuScreen.styles";

const { Title, Text } = Typography;
const CLEF_OPTIONS: Record<string, Clef> = {
  TREBLE: "treble",
  BASS: "bass",
};

const LEVEL_OPTIONS: Record<string, Level> = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
};

interface Props {
  onStart: (level: Level, clef: Clef) => void;
}

const MenuScreen = ({ onStart }: Props) => {
  const [level, setLevel] = useState<Level>(LEVEL_OPTIONS.ADVANCED);
  const [clef, setClef] = useState<Clef>(CLEF_OPTIONS.TREBLE);

  return (
    <Flex vertical align="center" justify="center" className={styles.screen}>
      <Card className={styles.card}>
        <Space direction="vertical" size="large" className={styles.content}>
          <div>
            <Title level={2} className={styles.title}>
              Note Reader
            </Title>
            <Text type="secondary">Sight-reading practice</Text>
          </div>

          <div className={styles.section}>
            <Text strong>Clef</Text>
            <Radio.Group
              value={clef}
              onChange={(event) => setClef(event.target.value as Clef)}
              className={styles.clefGroup}
            >
              <Radio.Button
                value={CLEF_OPTIONS.TREBLE}
                className={styles.clefOption}
              >
                Treble (G)
              </Radio.Button>
              <Radio.Button
                value={CLEF_OPTIONS.BASS}
                className={styles.clefOption}
              >
                Bass (F)
              </Radio.Button>
            </Radio.Group>
          </div>

          <div className={styles.section}>
            <Text strong>Level</Text>
            <Radio.Group
              value={level}
              onChange={(event) => setLevel(event.target.value as Level)}
              className={styles.levelGroup}
            >
              <Radio.Button
                value={LEVEL_OPTIONS.BEGINNER}
                className={styles.levelOption}
              >
                Beginner — Staff notes only
              </Radio.Button>
              <Radio.Button
                value={LEVEL_OPTIONS.INTERMEDIATE}
                className={styles.levelOption}
              >
                Intermediate — + Ledger lines
              </Radio.Button>
              <Radio.Button
                value={LEVEL_OPTIONS.ADVANCED}
                className={styles.levelOption}
              >
                Advanced — + Accidentals
              </Radio.Button>
            </Radio.Group>
          </div>

          <Button
            type="primary"
            size="large"
            block
            className={styles.startButton}
            onClick={() => onStart(level, clef)}
          >
            Start (20 questions)
          </Button>
        </Space>
      </Card>
    </Flex>
  );
};

export default MenuScreen;
