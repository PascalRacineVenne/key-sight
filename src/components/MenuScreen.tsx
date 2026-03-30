import { useState } from "react";
import { Button, Card, Radio, Space, Typography } from "antd";
import type { Clef, Level } from "../types";

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
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "linear-gradient(135deg, #e6f4ff 0%, #f0f5ff 100%)",
      }}
    >
      <Card style={{ width: "100%", maxWidth: 400, borderRadius: 16 }}>
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%", textAlign: "center" }}
        >
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Note Reader
            </Title>
            <Text type="secondary">Sight-reading practice</Text>
          </div>

          <div style={{ textAlign: "left" }}>
            <Text strong>Clef</Text>
            <Radio.Group
              value={clef}
              onChange={(e) => setClef(e.target.value as Clef)}
              style={{ display: "flex", gap: 12, marginTop: 8 }}
            >
              <Radio.Button
                value={CLEF_OPTIONS.TREBLE}
                style={{ flex: 1, textAlign: "center" }}
              >
                Treble (G)
              </Radio.Button>
              <Radio.Button
                value={CLEF_OPTIONS.BASS}
                style={{ flex: 1, textAlign: "center" }}
              >
                Bass (F)
              </Radio.Button>
            </Radio.Group>
          </div>

          <div style={{ textAlign: "left" }}>
            <Text strong>Level</Text>
            <Radio.Group
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 8,
              }}
            >
              <Radio.Button
                value={LEVEL_OPTIONS.BEGINNER}
                style={{ textAlign: "center" }}
              >
                Beginner — Staff notes only
              </Radio.Button>
              <Radio.Button
                value={LEVEL_OPTIONS.INTERMEDIATE}
                style={{ textAlign: "center" }}
              >
                Intermediate — + Ledger lines
              </Radio.Button>
              <Radio.Button
                value={LEVEL_OPTIONS.ADVANCED}
                style={{ textAlign: "center" }}
              >
                Advanced — + Accidentals
              </Radio.Button>
            </Radio.Group>
          </div>

          <Button
            type="primary"
            size="large"
            block
            style={{ height: 52, fontSize: 18, borderRadius: 12 }}
            onClick={() => onStart(level, clef)}
          >
            Start (20 questions)
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default MenuScreen;
