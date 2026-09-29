import { useState } from "react";
import { ConfigProvider, theme } from "antd";
import MenuScreen from "./components/MenuScreen";
import GameScreen from "./components/GameScreen";
import ResultsScreen from "./components/ResultsScreen";
import type { Answer, Clef, GamePhase, Level } from "./types";
import { generateQuestions } from "./gameLogic";
import { startAudio } from "./audio";
import { CLEF_TYPE } from "./constants";

const App = () => {
  const [phase, setPhase] = useState<GamePhase>("menu");
  const [level, setLevel] = useState<Level>("beginner");
  const [clef, setClef] = useState<Clef>(CLEF_TYPE.TREBLE);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const startGame = (selectedLevel: Level, selectedClef: Clef) => {
    void startAudio();
    setLevel(selectedLevel);
    setClef(selectedClef);
    setAnswers([]);
    setPhase("playing");
  };

  const finishGame = (finalAnswers: Answer[]) => {
    setAnswers(finalAnswers);
    setPhase("results");
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      {phase === "menu" && <MenuScreen onStart={startGame} />}
      {phase === "playing" && (
        <GameScreen
          level={level}
          clef={clef}
          questions={generateQuestions(level, clef)}
          onFinish={finishGame}
        />
      )}
      {phase === "results" && (
        <ResultsScreen
          answers={answers}
          level={level}
          clef={clef}
          onRestart={() => setPhase("menu")}
        />
      )}
    </ConfigProvider>
  );
};

export default App;
