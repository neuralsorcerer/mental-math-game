import React from "react";

interface QuestionProps {
  question: string;
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  handleSubmitAnswer: () => void;
  score: number;
}

const Question: React.FC<QuestionProps> = ({
  question,
  userAnswer,
  setUserAnswer,
  handleSubmitAnswer,
  score,
}) => {
  let textColor = "text-green-700";

  if (score > 1000) {
    textColor = "text-pink-600";
  } else if (score > 500) {
    textColor = "text-purple-600";
  } else if (score > 250) {
    textColor = "text-teal-600";
  }

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4">
      <h2 className="text-3xl font-bold mb-6">Solve:</h2>
      <p className={`text-5xl font-bold mb-6 ${textColor}`}>{question}</p>
      <input
        type="number"
        step="any"
        className="text-center text-2xl border-b-2 border-green-700 focus:outline-none mb-4"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmitAnswer();
          }
        }}
      />
      <button
        className={`px-6 py-3 text-base ${textColor} text-white rounded-full hover:bg-green-800 transition`}
        onClick={handleSubmitAnswer}
      >
        Submit
      </button>
    </div>
  );
};

export default Question;
