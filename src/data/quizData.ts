export type QuizCategory = 'general' | 'science' | 'history' | 'geography' | 'sports';
export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: QuizDifficulty;
  category: QuizCategory;
  timeLimit: number; // in seconds
}

export interface QuizResult {
  questionId: number;
  userAnswer: number | null;
  correctAnswer: number;
  timeSpent: number;
  isCorrect: boolean;
}

export const quizCategories = {
  general: 'General Knowledge',
  science: 'Science',
  history: 'History',
  geography: 'Geography',
  sports: 'Sports',
};

export const quizData: QuizQuestion[] = [
  // General Knowledge - Easy
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'general',
    timeLimit: 15,
  },
  {
    id: 2,
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'general',
    timeLimit: 15,
  },
  {
    id: 3,
    question: 'What color is the sky on a clear day?',
    options: ['Green', 'Blue', 'Red', 'Yellow'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'general',
    timeLimit: 10,
  },

  // General Knowledge - Medium
  {
    id: 4,
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'general',
    timeLimit: 20,
  },
  {
    id: 5,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 3,
    difficulty: 'medium',
    category: 'general',
    timeLimit: 20,
  },

  // General Knowledge - Hard
  {
    id: 6,
    question: 'In what year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'general',
    timeLimit: 25,
  },

  // Science - Easy
  {
    id: 7,
    question: 'What planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'science',
    timeLimit: 15,
  },
  {
    id: 8,
    question: 'How many legs does a spider have?',
    options: ['6', '8', '10', '12'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'science',
    timeLimit: 10,
  },

  // Science - Medium
  {
    id: 9,
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'science',
    timeLimit: 20,
  },
  {
    id: 10,
    question: 'What is the speed of light?',
    options: ['299,792 km/s', '199,792 km/s', '399,792 km/s', '99,792 km/s'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'science',
    timeLimit: 25,
  },

  // Science - Hard
  {
    id: 11,
    question: 'What is the most abundant gas in Earth\'s atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'science',
    timeLimit: 25,
  },

  // History - Easy
  {
    id: 12,
    question: 'Who was the first President of the United States?',
    options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'history',
    timeLimit: 15,
  },
  {
    id: 13,
    question: 'In which year did the Titanic sink?',
    options: ['1910', '1911', '1912', '1913'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'history',
    timeLimit: 20,
  },

  // History - Medium
  {
    id: 14,
    question: 'Who was the British Prime Minister during World War II?',
    options: ['Neville Chamberlain', 'Winston Churchill', 'Clement Attlee', 'Anthony Eden'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'history',
    timeLimit: 20,
  },

  // History - Hard
  {
    id: 15,
    question: 'What was the capital of the Byzantine Empire?',
    options: ['Rome', 'Athens', 'Constantinople', 'Alexandria'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'history',
    timeLimit: 25,
  },

  // Geography - Easy
  {
    id: 16,
    question: 'What is the largest country by area?',
    options: ['Canada', 'China', 'United States', 'Russia'],
    correctAnswer: 3,
    difficulty: 'easy',
    category: 'geography',
    timeLimit: 15,
  },
  {
    id: 17,
    question: 'Which river is the longest in the world?',
    options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'geography',
    timeLimit: 20,
  },

  // Geography - Medium
  {
    id: 18,
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'geography',
    timeLimit: 20,
  },

  // Geography - Hard
  {
    id: 19,
    question: 'Which country has the most time zones?',
    options: ['Russia', 'United States', 'France', 'China'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'geography',
    timeLimit: 25,
  },

  // Sports - Easy
  {
    id: 20,
    question: 'How many players are on a soccer team?',
    options: ['9', '10', '11', '12'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'sports',
    timeLimit: 10,
  },
  {
    id: 21,
    question: 'What sport is played at Wimbledon?',
    options: ['Football', 'Tennis', 'Cricket', 'Golf'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'sports',
    timeLimit: 15,
  },

  // Sports - Medium
  {
    id: 22,
    question: 'How many rings are on the Olympic flag?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'sports',
    timeLimit: 20,
  },

  // Sports - Hard
  {
    id: 23,
    question: 'Who has won the most Grand Slam tennis titles (male)?',
    options: ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Pete Sampras'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'sports',
    timeLimit: 25,
  },
];

export const getQuestionsByFilters = (
  category: QuizCategory | 'all',
  difficulty: QuizDifficulty | 'all'
): QuizQuestion[] => {
  return quizData.filter((q) => {
    const matchCategory = category === 'all' || q.category === category;
    const matchDifficulty = difficulty === 'all' || q.difficulty === difficulty;
    return matchCategory && matchDifficulty;
  });
};
