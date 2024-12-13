import React from "react";

interface HeaderProps {
  timer: number;
  score: number;
  exitGame: () => void;
  startGame: () => void;
}

const Header: React.FC<HeaderProps> = ({
  timer,
  score,
  exitGame,
  startGame,
}) => {
  let bgColor = "#2F855A";
  
  if (score > 1000) {
    bgColor = "#B83280";
  } else if (score > 500) {
    bgColor = "#6B46C1";
  } else if (score > 250) {
    bgColor = "#2C7A7B";
  }
  
  return (
  <div className="flex flex-col md:flex-row items-center justify-between p-4 transition-colors duration-500 ease-in-out text-white" style={{ backgroundColor: bgColor }}>
    <div className="mb-2 md:mb-0">
      <p className="text-lg font-bold">Time Left: {timer}s</p>
    </div>
    <div className="mb-2 md:mb-0">
      <p className="text-lg font-bold">Score: {score}</p>
    </div>
    <div className="flex space-x-2">
      <button
        className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition"
        onClick={exitGame}
      >
        Exit
      </button>
      <button
        className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 transition"
        onClick={startGame}
      >
        Restart
      </button>
    </div>
  </div>
)
};

export default Header;
