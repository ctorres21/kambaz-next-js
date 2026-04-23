import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;

// ── Quizzes ──
export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};
export const findQuizById = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}`);
  return data;
};
export const createQuiz = async (courseId: string, quiz: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return data;
};
export const updateQuiz = async (quiz: any) => {
  const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};
export const deleteQuiz = async (quizId: string) => {
  const { data } = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return data;
};

// ── Questions ──
export const findQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return data;
};
export const createQuestion = async (quizId: string, question: any) => {
  const { data } = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return data;
};
export const updateQuestion = async (question: any) => {
  const { data } = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
  return data;
};
export const deleteQuestion = async (questionId: string) => {
  const { data } = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return data;
};

// ── Attempts ──
export const findAttemptsForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
  return data;
};
export const getLatestAttempt = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/latest`);
  return data;
};
export const submitAttempt = async (quizId: string, answers: any) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, { answers });
  return data;
};
