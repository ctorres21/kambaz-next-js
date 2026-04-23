import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;

export interface Quiz {
  _id: string;
  course: string;
  title: string;
  description: string;
  quizType: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  points: number;
  published: boolean;
  numberOfQuestions: number;
}

export interface Question {
  _id: string;
  quiz: string;
  title: string;
  type: string;
  points: number;
  question: string;
  choices?: string[];
  correctAnswer?: number | boolean;
  correctAnswers?: string[];
  _isNew?: boolean;
}

export interface AttemptResult {
  correct: boolean;
  userAnswer: number | boolean | string;
  points: number;
}

export interface Attempt {
  _id: string;
  quiz: string;
  user: string;
  answers: Record<string, number | boolean | string>;
  results: Record<string, AttemptResult>;
  score: number;
  totalPoints: number;
  submittedAt: string;
  attemptNumber: number;
}

// ── Quizzes ──
export const findQuizzesForCourse = async (courseId: string): Promise<Quiz[]> => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};
export const findQuizById = async (quizId: string): Promise<Quiz> => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}`);
  return data;
};
export const createQuiz = async (courseId: string, quiz: Partial<Quiz>): Promise<Quiz> => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return data;
};
export const updateQuiz = async (quiz: Partial<Quiz> & { _id: string }): Promise<Quiz> => {
  const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};
export const deleteQuiz = async (quizId: string): Promise<void> => {
  await axios.delete(`${QUIZZES_API}/${quizId}`);
};

// ── Questions ──
export const findQuestionsForQuiz = async (quizId: string): Promise<Question[]> => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return data;
};
export const createQuestion = async (quizId: string, question: Partial<Question>): Promise<Question> => {
  const { data } = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return data;
};
export const updateQuestion = async (question: Partial<Question> & { _id: string }): Promise<Question> => {
  const { data } = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
  return data;
};
export const deleteQuestion = async (questionId: string): Promise<void> => {
  await axios.delete(`${QUESTIONS_API}/${questionId}`);
};

// ── Attempts ──
export const findAttemptsForQuiz = async (quizId: string): Promise<Attempt[]> => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
  return data;
};
export const getLatestAttempt = async (quizId: string): Promise<Attempt | null> => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/latest`);
  return data;
};
export const submitAttempt = async (quizId: string, answers: Record<string, number | boolean | string>): Promise<Attempt> => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, { answers });
  return data;
};
