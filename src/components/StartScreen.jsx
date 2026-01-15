import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, PlayCircle } from 'lucide-react';

function StartScreen({ onStart }) {
  const [selectedMode, setSelectedMode] = useState("text");
  const [numQuestions, setNumQuestions] = useState(10);

  const handleStart = () => {
    onStart({
      mode: selectedMode,
      numQuestions: numQuestions
    });
  };

  return (
    <div className="min-h-screen bg-warmgrey-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-sand-500 rounded-full mb-4 sm:mb-6"
          >
            <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-3 sm:mb-4 px-4">
            AI vs Real Quote Game
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-warmgrey-600 max-w-xl mx-auto px-4">
            Can you tell the difference between genuine inspirational quotes and AI-generated ones? 
            Test your skills and see if you can spot the real from the artificial!
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-warmgrey-800 mb-2 sm:mb-3">
              Select Game Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <button
                onClick={() => setSelectedMode("text")}
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${
                  selectedMode === "text"
                    ? "border-sand-500 bg-sand-50"
                    : "border-warmgrey-200 hover:border-sand-300"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedMode === "text" ? "border-sand-500" : "border-warmgrey-300"
                  }`}>
                    {selectedMode === "text" && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-sand-500"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-warmgrey-900 text-sm sm:text-base">Text Quotes Only</div>
                    <div className="text-xs sm:text-sm text-warmgrey-600">Analyze inspirational quotes</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setSelectedMode("image")}
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${
                  selectedMode === "image"
                    ? "border-sand-500 bg-sand-50"
                    : "border-warmgrey-200 hover:border-sand-300"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedMode === "image" ? "border-sand-500" : "border-warmgrey-300"
                  }`}>
                    {selectedMode === "image" && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-sand-500"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-warmgrey-900 text-sm sm:text-base">Images Only</div>
                    <div className="text-xs sm:text-sm text-warmgrey-600">Identify AI vs Real photos</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setSelectedMode("mixed")}
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${
                  selectedMode === "mixed"
                    ? "border-sand-500 bg-sand-50"
                    : "border-warmgrey-200 hover:border-sand-300"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedMode === "mixed" ? "border-sand-500" : "border-warmgrey-300"
                  }`}>
                    {selectedMode === "mixed" && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-sand-500"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-warmgrey-900 text-sm sm:text-base">Mixed Mode</div>
                    <div className="text-xs sm:text-sm text-warmgrey-600">Both quotes and images</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm sm:text-base font-semibold text-warmgrey-800 mb-2 sm:mb-3">
              Number of Questions
            </label>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[5, 10, 15, 20].map((num) => (
                <button
                  key={num}
                  onClick={() => setNumQuestions(num)}
                  className={`py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                    numQuestions === num
                      ? "bg-sand-500 text-white"
                      : "bg-warmgrey-100 text-warmgrey-700 hover:bg-warmgrey-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-sand-500 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-sand-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            Start Game
          </button>
        </div>

        <div className="mt-6 sm:mt-8 text-center px-4">
          <p className="text-xs sm:text-sm text-warmgrey-500 flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            Powered by advanced quote analysis
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default StartScreen;