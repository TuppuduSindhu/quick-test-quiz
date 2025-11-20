import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion, QuizResult } from '@/data/quizData';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizInterfaceProps {
  questions: QuizQuestion[];
  onComplete: (results: QuizResult[]) => void;
}

const QuizInterface = ({ questions, onComplete }: QuizInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, number | null>>(new Map());
  const [timeLeft, setTimeLeft] = useState(questions[0].timeLimit);
  const [startTime, setStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState<Map<number, number>>(new Map());

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    setTimeLeft(currentQuestion.timeLimit);
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex, currentQuestion.timeLimit]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleAnswer = (optionIndex: number) => {
    setAnswers(new Map(answers.set(currentQuestion.id, optionIndex)));
  };

  const handleNextQuestion = () => {
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    setTimeSpent(new Map(timeSpent.set(currentQuestion.id, timeTaken)));

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
      setTimeSpent(new Map(timeSpent.set(currentQuestion.id, timeTaken)));
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const results: QuizResult[] = questions.map((question) => {
      const userAnswer = answers.get(question.id) ?? null;
      return {
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        timeSpent: timeSpent.get(question.id) ?? 0,
        isCorrect: userAnswer === question.correctAnswer,
      };
    });
    onComplete(results);
  };

  const timerColor = timeLeft <= 5 ? 'text-destructive' : timeLeft <= 10 ? 'text-warning' : 'text-primary';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
            <div className={cn('flex items-center gap-2 text-2xl font-bold', timerColor)}>
              <Clock className="w-6 h-6" />
              {timeLeft}s
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase mb-4">
              {currentQuestion.category} • {currentQuestion.difficulty}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-6">{currentQuestion.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers.get(currentQuestion.id) === index;
              return (
                <Button
                  key={index}
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => handleAnswer(index)}
                  className="w-full h-auto py-4 px-6 text-left justify-start text-base"
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <Button onClick={handleNextQuestion} className="flex items-center gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-success hover:bg-success/90">
              Submit Quiz
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizInterface;
