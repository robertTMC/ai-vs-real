import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, Home, Target, Zap, CheckCircle, XCircle } from 'lucide-react';

function ResultScreen({ results, onPlayAgain, onBackToStart }) {
  const percentage = Math.round((results.correct / results.total) * 100);
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: "Outstanding!", color: "text-yellow-400" };
    if (percentage >= 75) return { text: "Excellent!", color: "text-sky-400" };
    if (percentage >= 60) return { text: "Good Job!", color: "text-sand-500" };
    if (percentage >= 40) return { text: "Not Bad!", color: "text-neutral-400" };
    return { text: "Keep Practicing!", color: "text-neutral-500" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-warmgrey-900 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-sand-500 rounded-full mb-4 sm:mb-6"
          >
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 px-4">
            Game Complete!
          </h1>
          <p className={`text-2xl sm:text-3xl font-bold ${performance.color} px-4`}>
            {performance.text}
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            <div className="text-center p-3 sm:p-4 bg-warmgrey-50 rounded-lg sm:rounded-xl">
              <div className="text-2xl sm:text-3xl font-bold text-primary-900">{results.score}</div>
              <div className="text-xs sm:text-sm font-medium text-warmgrey-600 mt-1 flex items-center justify-center gap-1">
                <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                Total Score
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-warmgrey-50 rounded-lg sm:rounded-xl">
              <div className="text-2xl sm:text-3xl font-bold text-sky-500">{results.correct}</div>
              <div className="text-xs sm:text-sm font-medium text-warmgrey-600 mt-1 flex items-center justify-center gap-1">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                Correct
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-warmgrey-50 rounded-lg sm:rounded-xl">
              <div className="text-2xl sm:text-3xl font-bold text-warmgrey-800">{results.wrong}</div>
              <div className="text-xs sm:text-sm font-medium text-warmgrey-600 mt-1 flex items-center justify-center gap-1">
                <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                Wrong
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-warmgrey-50 rounded-lg sm:rounded-xl">
              <div className="text-2xl sm:text-3xl font-bold text-sand-600">{results.maxStreak}</div>
              <div className="text-xs sm:text-sm font-medium text-warmgrey-600 mt-1 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                Best Streak
              </div>
            </div>
          </div>

          <div className="bg-warmgrey-800 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold text-sm sm:text-base">Accuracy</span>
              <span className="text-white font-bold text-sm sm:text-base">{percentage}%</span>
            </div>
            <div className="w-full bg-warmgrey-700 rounded-full h-3 sm:h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`h-full rounded-full ${
                  percentage >= 75
                    ? "bg-sky-400"
                    : percentage >= 50
                    ? "bg-sand-500"
                    : "bg-warmgrey-600"
                }`}
              ></motion.div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 max-h-60 sm:max-h-64 overflow-y-auto">
            <h3 className="font-bold text-warmgrey-900 text-base sm:text-lg mb-2 sm:mb-3">Review</h3>
            {results.history.slice(0, 5).map((entry, idx) => (
              <div
                key={idx}
                className={`p-3 sm:p-4 rounded-lg border-2 ${
                  entry.correct
                    ? "border-sky-200 bg-sky-50"
                    : "border-warmgrey-300 bg-warmgrey-50"
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {entry.correct ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-900" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-warmgrey-900 mb-1 italic">
                      "{entry.question.content.substring(0, 80)}..."
                    </p>
                    <p className="text-xs sm:text-sm text-warmgrey-600">
                      <span className="font-semibold">Your answer:</span> {entry.playerAnswer === "ai" ? "AI" : "Real"} 
                      {" | "}
                      <span className="font-semibold">Actual:</span> {entry.question.correctLabel === "ai" ? "AI" : "Real"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            onClick={onPlayAgain}
            className="bg-sand-500 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-sand-600 transition-all flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            Play Again
          </button>
          <button
            onClick={onBackToStart}
            className="bg-white text-warmgrey-900 font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-warmgrey-50 transition-all flex items-center justify-center gap-2 shadow-lg border-2 border-warmgrey-200 text-sm sm:text-base"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Start
          </button>
        </div>

        <footer className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 text-center px-4">
          <p className="text-xs sm:text-sm text-warmgrey-400">
            AI vibe coded development by{" "}
            <a
              href="https://biela.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              className="text-sand-400 hover:text-sand-300 font-medium transition-colors"
            >
              Biela.dev
            </a>
            , powered by{" "}
            <a
              href="https://teachmecode.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              className="text-sand-400 hover:text-sand-300 font-medium transition-colors"
            >
              TeachMeCode® Institute
            </a>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}

export default ResultScreen;