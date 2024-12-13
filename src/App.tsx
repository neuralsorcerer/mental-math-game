import React, { useState, useEffect, useRef, useCallback } from "react";
import useSound from "use-sound";
import StartScreen from "./components/StartScreen";
import GameOverScreen from "./components/GameOverScreen";
import Header from "./components/Header";
import Question from "./components/Question";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "gameover">(
    "start"
  );
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [timer, setTimer] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [highScore, setHighScore] = useState<number>(
    parseInt(localStorage.getItem("highScore") || "0")
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const [playCorrect] = useSound("/sounds/correct.mp3", { volume: 0.5 });
  const [playIncorrect] = useSound("/sounds/incorrect.mp3", { volume: 0.5 });

  const generateQuestion = useCallback(() => {
    let num1: number;
    let num2: number;
    let operator: string;
    let answer: number;

    let operators: string[] = [];

    switch (difficulty) {
      case "easy":
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operators = ["+", "-"];
        operator = operators[Math.floor(Math.random() * operators.length)];
        break;
      case "medium":
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        operators = ["+", "-", "*"];
        operator = operators[Math.floor(Math.random() * operators.length)];
        break;
      case "hard":
        operators = ["+", "-", "*", "/"];
        operator = operators[Math.floor(Math.random() * operators.length)];
        if (operator === "/") {
          num2 = Math.floor(Math.random() * 12) + 1;
          const temp = Math.floor(Math.random() * 12) + 1;
          num1 = num2 * temp;
        } else {
          num1 = Math.floor(Math.random() * 100) + 1;
          num2 = Math.floor(Math.random() * 100) + 1;
        }
        break;
      default:
        num1 = 1;
        num2 = 1;
        operator = "+";
    }

    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      case "/":
        answer = num1 / num2;
        break;
      default:
        answer = num1 + num2;
    }

    setQuestion(`${num1} ${operator} ${num2}`);
    setCorrectAnswer(answer);
  }, [difficulty]);

  useEffect(() => {
    if (gameState === "playing") {
      generateQuestion();
      startTimer();
    }
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [gameState, generateQuestion]);

  useEffect(() => {
    if (timer === 0) {
      endGame();
    }
  }, [timer]);

  useEffect(() => {
    if (gameState === "playing" && score >= 1500 && !isDarkMode) {
      setIsDarkMode(true);
    }
  }, [score, isDarkMode, gameState]);

  const startGame = () => {
    setScore(0);
    setIsDarkMode(false);
    setTimer(difficulty === "easy" ? 60 : difficulty === "medium" ? 30 : 10);
    setGameState("playing");
  };

  const updateHighScore = () => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score.toString());
    }
  };

  const endGame = () => {
    updateHighScore();
    setGameState("gameover");
    if (timerRef.current !== null) clearInterval(timerRef.current);
  };

  const exitGame = () => {
    updateHighScore();
    setGameState("start");
    setScore(0);
    setIsDarkMode(false);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setTimer((prev) => {
        if (prev === 1 && timerRef.current !== null)
          clearInterval(timerRef.current);
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmitAnswer = () => {
    if (parseFloat(userAnswer) === correctAnswer) {
      playCorrect();
      setScore((prevScore) => prevScore + 10);
      setTimer((prev) => prev + 2);
    } else {
      playIncorrect();
      setScore((prev) => (prev >= 5 ? prev - 5 : 0));
    }
    setUserAnswer("");
    generateQuestion();
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-green-200 to-blue-300"
      }`}
    >
      {gameState === "start" && (
        <StartScreen
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          startGame={startGame}
          highScore={highScore}
        />
      )}

      {gameState === "playing" && (
        <div
          className={`w-11/12 md:w-4/5 h-full md:h-4/5 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg overflow-hidden shadow-lg flex flex-col`}
        >
          <Header
            timer={timer}
            score={score}
            exitGame={exitGame}
            startGame={startGame}
          />
          <Question
            question={question}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            handleSubmitAnswer={handleSubmitAnswer}
            score={score}
          />
        </div>
      )}

      {gameState === "gameover" && (
        <GameOverScreen
          score={score}
          highScore={highScore}
          restartGame={() => setGameState("start")}
        />
      )}
    </div>
  );
};

export default App;
