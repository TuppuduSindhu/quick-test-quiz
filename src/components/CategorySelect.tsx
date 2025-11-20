import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizCategory, QuizDifficulty, quizCategories } from '@/data/quizData';
import { Brain, Atom, Clock, Globe, Trophy } from 'lucide-react';

interface CategorySelectProps {
  onStart: (category: QuizCategory | 'all', difficulty: QuizDifficulty | 'all') => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  general: <Brain className="w-8 h-8" />,
  science: <Atom className="w-8 h-8" />,
  history: <Clock className="w-8 h-8" />,
  geography: <Globe className="w-8 h-8" />,
  sports: <Trophy className="w-8 h-8" />,
};

const CategorySelect = ({ onStart }: CategorySelectProps) => {
  const [selectedCategory, setSelectedCategory] = React.useState<QuizCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<QuizDifficulty | 'all'>('all');

  const handleStart = () => {
    onStart(selectedCategory, selectedDifficulty);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-foreground mb-2">Quiz Master</h1>
          <p className="text-lg text-muted-foreground">Test your knowledge across various topics</p>
        </div>

        <div className="space-y-6">
          {/* Category Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Select Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="h-24 flex flex-col items-center justify-center gap-2"
              >
                <Brain className="w-8 h-8" />
                <span>All Categories</span>
              </Button>
              {Object.entries(quizCategories).map(([key, value]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(key as QuizCategory)}
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  {categoryIcons[key]}
                  <span>{value}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Select Difficulty</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty('all')}
                className="h-16"
              >
                All Levels
              </Button>
              <Button
                variant={selectedDifficulty === 'easy' ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty('easy')}
                className="h-16"
              >
                Easy
              </Button>
              <Button
                variant={selectedDifficulty === 'medium' ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty('medium')}
                className="h-16"
              >
                Medium
              </Button>
              <Button
                variant={selectedDifficulty === 'hard' ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty('hard')}
                className="h-16"
              >
                Hard
              </Button>
            </div>
          </div>

          <Button onClick={handleStart} size="lg" className="w-full h-14 text-lg font-semibold">
            Start Quiz
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CategorySelect;

import React from 'react';
