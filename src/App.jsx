import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { allQuestions } from './data/quotes';

function App() {
  const [gameState, setGameState] = useState("start");
  const [gameConfig, setGameConfig] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [results, setResults] = useState(null);

  const handleStartGame = (config) => {
    setGameConfig(config);
    let filtered = [...allQuestions];
    
    if (config.mode === "text") {
      filtered = filtered.filter(q => q.type === "text");
    } else if (config.mode === "image") {
      filtered = filtered.filter(q => q.type === "image");
    }
    // If mode is "mixed", use all questions (no filtering needed)
    
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, config.numQuestions);
    setFilteredQuestions(selected);
    setGameState("game");
  };

  const handleGameComplete = (gameResults) => {
    setResults(gameResults);
    setGameState("result");
  };

  const handlePlayAgain = () => {
    let filtered = [...allQuestions];
    
    if (gameConfig.mode === "text") {
      filtered = filtered.filter(q => q.type === "text");
    } else if (gameConfig.mode === "image") {
      filtered = filtered.filter(q => q.type === "image");
    }
    
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, gameConfig.numQuestions);
    setFilteredQuestions(selected);
    setGameState("game");
  };

  const handleBackToStart = () => {
    setGameState("start");
    setGameConfig(null);
    setFilteredQuestions([]);
    setResults(null);
  };

  return (
    <div className="min-h-screen">
      {gameState === "start" && (
        <StartScreen onStart={handleStartGame} />
      )}
      {gameState === "game" && (
        <GameScreen 
          questions={filteredQuestions} 
          onComplete={handleGameComplete}
        />
      )}
      {gameState === "result" && (
        <ResultScreen
          results={results}
          onPlayAgain={handlePlayAgain}
          onBackToStart={handleBackToStart}
        />
      )}
    </div>
  );
}

export default App;
