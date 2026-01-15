import React, { useState, useEffect } from 'react';
import ImageLoader from './ImageLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, CheckCircle, XCircle, Zap } from 'lucide-react';
import { X } from 'lucide-react';

function GameScreen({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Preload next image
  useEffect(() => {
    if (currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1];
      if (nextQuestion.type === "image" && !preloadedImages.has(nextQuestion.content)) {
        const img = new Image();
        img.src = nextQuestion.content;
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, nextQuestion.content]));
        };
      }
    }
  }, [currentIndex, questions, preloadedImages]);

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isImageFullscreen) {
        setIsImageFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isImageFullscreen]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (playerChoice) => {
    const isCorrect = playerChoice === currentQuestion.correctLabel;
    const pointsEarned = isCorrect ? (currentQuestion.difficulty === "hard" ? 15 : currentQuestion.difficulty === "medium" ? 10 : 5) : 0;

    if (isCorrect) {
      setScore(score + pointsEarned);
      setCorrect(correct + 1);
      setStreak(streak + 1);
      if (streak + 1 > maxStreak) {
        setMaxStreak(streak + 1);
      }
    } else {
      setWrong(wrong + 1);
      setStreak(0);
    }

    const historyEntry = {
      question: currentQuestion,
      playerAnswer: playerChoice,
      correct: isCorrect,
      points: pointsEarned
    };

    setAnswerHistory([...answerHistory, historyEntry]);
    setLastAnswer(historyEntry);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const finalCorrect = lastAnswer.correct ? correct + 1 : correct;
      const finalWrong = lastAnswer.correct ? wrong : wrong + 1;
      const finalMaxStreak = streak > maxStreak ? streak : maxStreak;
      
      onComplete({
        score,
        correct: finalCorrect,
        wrong: finalWrong,
        maxStreak: finalMaxStreak,
        total: questions.length,
        history: [...answerHistory]
      });
    }
  };

  return (
    <div className="min-h-screen bg-warmgrey-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-white">
            <div className="text-xs sm:text-sm font-medium text-warmgrey-300">Question</div>
            <div className="text-xl sm:text-2xl font-bold">
              {currentIndex + 1} of {questions.length}
            </div>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-xs sm:text-sm font-medium text-warmgrey-300">Score</div>
              <div className="text-xl sm:text-2xl font-bold text-sand-500">{score}</div>
            </div>
            <div className="text-center">
              <div className="text-xs sm:text-sm font-medium text-warmgrey-300">Streak</div>
              <div className="text-xl sm:text-2xl font-bold text-sky-400 flex items-center gap-1">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                {streak}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12"
            >
              {currentQuestion.type === "text" ? (
                <div className="min-h-[160px] sm:min-h-[200px] flex items-center justify-center mb-6 sm:mb-8">
                  <p className="text-lg sm:text-2xl md:text-3xl font-medium text-warmgrey-900 text-center leading-relaxed italic px-2">
                    "{currentQuestion.content}"
                  </p>
                </div>
              ) : (
                <div className="mb-6 sm:mb-8">
                  <ImageLoader
                    src={currentQuestion.content}
                    alt="Question image"
                    className="rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
                    imageClassName="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-contain bg-warmgrey-50"
                    onClick={() => setIsImageFullscreen(true)}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer("ai")}
                  className="bg-warmgrey-800 text-white font-bold py-4 sm:py-6 rounded-lg sm:rounded-xl hover:bg-warmgrey-900 transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg text-sm sm:text-base"
                >
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
                  AI Generated
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer("real")}
                  className="bg-sand-500 text-white font-bold py-4 sm:py-6 rounded-lg sm:rounded-xl hover:bg-sand-600 transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg text-sm sm:text-base"
                >
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                  Real Quote
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 ${
                lastAnswer.correct
                  ? "bg-sky-400"
                  : "bg-warmgrey-800"
              }`}
            >
              <div className="text-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full mb-4 sm:mb-6"
                >
                  {lastAnswer.correct ? (
                    <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
                  ) : (
                    <XCircle className="w-10 h-10 sm:w-12 sm:h-12" />
                  )}
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                  {lastAnswer.correct ? "Correct!" : "Not Quite!"}
                </h2>
                <p className="text-base sm:text-xl mb-4 sm:mb-6 opacity-90 px-2">
                  {lastAnswer.correct
                    ? `It was ${currentQuestion.correctLabel === "ai" ? "AI-generated" : "a real quote"}!`
                    : `It was ${currentQuestion.correctLabel === "ai" ? "AI-generated" : "a real quote"}, not ${lastAnswer.playerAnswer === "ai" ? "AI-generated" : "a real quote"}`
                  }
                </p>
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                  {currentQuestion.type === "image" && currentQuestion.correctLabel === "ai" ? (
                    <>
                      <p className="text-xs sm:text-sm font-medium opacity-75 mb-2">AI Generation Prompt</p>
                      <p className="text-sm sm:text-base leading-relaxed italic">&ldquo;{currentQuestion.shortExplanation}&rdquo;</p>
                    </>
                  ) : currentQuestion.type === "image" && currentQuestion.correctLabel === "real" ? (
                    <>
                      <p className="text-xs sm:text-sm font-medium opacity-75 mb-2">Photo Details</p>
                      <p className="text-sm sm:text-base leading-relaxed">{currentQuestion.shortExplanation}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs sm:text-sm font-medium opacity-75 mb-2">Explanation</p>
                      <p className="text-sm sm:text-base leading-relaxed">{currentQuestion.shortExplanation}</p>
                    </>
                  )}
                </div>
                <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4">
                  {lastAnswer.correct && lastAnswer.points > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl sm:text-2xl font-bold"
                    >
                      +{lastAnswer.points} points!
                    </motion.div>
                  )}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={handleNext}
                    className="w-full bg-white/20 backdrop-blur-sm text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-white/30 transition-all flex items-center justify-center gap-2 border-2 border-white/40 text-sm sm:text-base"
                  >
                    {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Image Lightbox */}
        <AnimatePresence>
          {isImageFullscreen && currentQuestion.type === "image" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-warmgrey-900/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsImageFullscreen(false)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                onClick={() => setIsImageFullscreen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                aria-label="Close fullscreen"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-6xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentQuestion.content}
                  alt="Fullscreen view"
                  className="w-full h-full object-contain rounded-lg sm:rounded-xl shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 sm:mt-6 bg-warmgrey-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex gap-1">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-1.5 sm:h-2 rounded-full transition-all ${
                  idx < currentIndex
                    ? answerHistory[idx]?.correct
                      ? "bg-sky-400"
                      : "bg-warmgrey-700"
                    : idx === currentIndex
                    ? "bg-sand-500"
                    : "bg-warmgrey-600"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameScreen;