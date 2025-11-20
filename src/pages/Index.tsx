import React, { useState } from 'react';
import CategorySelect from '@/components/CategorySelect';
import QuizInterface from '@/components/QuizInterface';
import ResultsPage from '@/components/ResultsPage';
import { QuizCategory, QuizDifficulty, QuizQuestion, QuizResult, getQuestionsByFilters } from '@/data/quizData';

type AppState = 'category' | 'quiz' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('category');
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  const handleStartQuiz = (category: QuizCategory | 'all', difficulty: QuizDifficulty | 'all') => {
    const questions = getQuestionsByFilters(category, difficulty);
    if (questions.length === 0) {
      alert('No questions available for this combination. Please select different options.');
      return;
    }
    setSelectedQuestions(questions);
    setAppState('quiz');
  };

  const handleQuizComplete = (results: QuizResult[]) => {
    setQuizResults(results);
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('category');
    setSelectedQuestions([]);
    setQuizResults([]);
  };

  return (
    <>
      {appState === 'category' && <CategorySelect onStart={handleStartQuiz} />}
      {appState === 'quiz' && <QuizInterface questions={selectedQuestions} onComplete={handleQuizComplete} />}
      {appState === 'results' && (
        <ResultsPage questions={selectedQuestions} results={quizResults} onRestart={handleRestart} />
      )}
    </>
  );
};

export default Index;
