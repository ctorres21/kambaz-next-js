import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, Question } from "./client";

interface QuizzesState {
  quizzes: Quiz[];
  questions: Question[];
}

const initialState: QuizzesState = {
  quizzes: [],
  questions: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = [...state.quizzes, action.payload];
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload._id ? action.payload : q
      );
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions = [...state.questions, action.payload];
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter((q) => q._id !== action.payload);
    },
    updateQuestionInStore: (state, action: PayloadAction<Question>) => {
      state.questions = state.questions.map((q) =>
        q._id === action.payload._id ? action.payload : q
      );
    },
  },
});

export const {
  setQuizzes, addQuiz, deleteQuiz, updateQuiz,
  setQuestions, addQuestion, removeQuestion, updateQuestionInStore,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
