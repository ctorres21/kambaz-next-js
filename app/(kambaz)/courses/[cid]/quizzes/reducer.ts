import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
  questions: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz];
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      );
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: question }) => {
      state.questions = [...state.questions, question];
    },
    removeQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter((q: any) => q._id !== questionId);
    },
    updateQuestionInStore: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q
      );
    },
  },
});

export const {
  setQuizzes, addQuiz, deleteQuiz, updateQuiz,
  setQuestions, addQuestion, removeQuestion, updateQuestionInStore,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
