import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizQuestion, QuizResult } from '@/data/quizData';
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface ResultsPageProps {
  questions: QuizQuestion[];
  results: QuizResult[];
  onRestart: () => void;
}

const ResultsPage = ({ questions, results, onRestart }: ResultsPageProps) => {
  const correctAnswers = results.filter((r) => r.isCorrect).length;
  const incorrectAnswers = results.length - correctAnswers;
  const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0);
  const averageTime = Math.round(totalTime / results.length);
  const score = Math.round((correctAnswers / results.length) * 100);

  const pieData = [
    { name: 'Correct', value: correctAnswers, color: 'hsl(var(--success))' },
    { name: 'Incorrect', value: incorrectAnswers, color: 'hsl(var(--destructive))' },
  ];

  const barData = results.map((result, index) => {
    const question = questions.find((q) => q.id === result.questionId);
    return {
      name: `Q${index + 1}`,
      time: result.timeSpent,
      limit: question?.timeLimit || 0,
    };
  });

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-8 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-2 text-foreground">Quiz Complete!</h1>
          <p className="text-xl text-muted-foreground">Here's how you performed</p>
        </Card>

        {/* Score Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div className="text-3xl font-bold text-foreground">{score}%</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="text-3xl font-bold text-foreground">{correctAnswers}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div className="text-3xl font-bold text-foreground">{incorrectAnswers}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div className="text-sm text-muted-foreground">Avg Time</div>
            </div>
            <div className="text-3xl font-bold text-foreground">{averageTime}s</div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Answer Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Time Spent per Question</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="time" fill="hsl(var(--primary))" name="Time Spent (s)" />
                <Bar dataKey="limit" fill="hsl(var(--muted))" name="Time Limit (s)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Detailed Results */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Question Breakdown</h2>
          <div className="space-y-4">
            {results.map((result, index) => {
              const question = questions.find((q) => q.id === result.questionId);
              if (!question) return null;

              return (
                <div
                  key={result.questionId}
                  className={`p-4 rounded-lg border-2 ${
                    result.isCorrect
                      ? 'border-success bg-success/5'
                      : 'border-destructive bg-destructive/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-foreground mb-2">
                        Q{index + 1}: {question.question}
                      </div>
                      <div className="text-sm space-y-1">
                        {result.userAnswer !== null ? (
                          <div>
                            <span className="text-muted-foreground">Your answer: </span>
                            <span className={result.isCorrect ? 'text-success' : 'text-destructive'}>
                              {question.options[result.userAnswer]}
                            </span>
                          </div>
                        ) : (
                          <div className="text-destructive">No answer selected</div>
                        )}
                        {!result.isCorrect && (
                          <div>
                            <span className="text-muted-foreground">Correct answer: </span>
                            <span className="text-success">{question.options[result.correctAnswer]}</span>
                          </div>
                        )}
                        <div className="text-muted-foreground">Time spent: {result.timeSpent}s</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex justify-center">
          <Button onClick={onRestart} size="lg" className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Take Another Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
