import React from "react";
import { motion } from "framer-motion";

interface GameOverScreenProps {
  score: number;
  highScore: number;
  restartGame: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  highScore,
  restartGame,
}) => (
  <motion.div
    className="flex flex-col items-center justify-center min-h-screen text-center space-y-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h1 className="text-4xl md:text-5xl font-bold text-red-600">Game Over</h1>
    <p className="text-xl md:text-2xl">Your Score: {score}</p>
    <p className="text-xl md:text-2xl">High Score: {highScore}</p>
    <motion.button
      className="px-6 py-3 text-sm md:text-base bg-green-700 text-white rounded-full transition"
      onClick={restartGame}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Play Again
    </motion.button>
  </motion.div>
);

export default GameOverScreen;
