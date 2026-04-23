"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as quizClient from "../../client";
import { Quiz, Question } from "../../client";
import {
  Button, Card, Form, FormControl, Alert,
} from "react-bootstrap";

interface ShuffledChoice {
  c: string;
  wasCorrect: boolean;
}

export default function QuizAttempt() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number | boolean | string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const autoSubmittedRef = useRef(false);

  useEffect(() => {
    const fetch = async () => {
      const q = await quizClient.findQuizById(qid as string);
      setQuiz(q);
      const qs = await quizClient.findQuestionsForQuiz(qid as string);
      if (q.shuffleAnswers) {
        for (const question of qs) {
          if (question.type === "Multiple Choice" && question.choices) {
            const indexed: ShuffledChoice[] = question.choices.map((c: string, i: number) => ({
              c,
              wasCorrect: i === question.correctAnswer,
            }));
            for (let i = indexed.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
            }
            question.choices = indexed.map((x) => x.c);
            question.correctAnswer = indexed.findIndex((x) => x.wasCorrect);
          }
        }
      }
      setQuestions(qs);
      if (q.timeLimit && q.timeLimit > 0) {
        setTimeLeft(q.timeLimit * 60);
      }
      if (!q.accessCode) setAccessGranted(true);
    };
    fetch();
  }, [qid]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft !== null]);

  useEffect(() => {
    if (timeLeft === 0 && accessGranted && !autoSubmittedRef.current) {
      autoSubmittedRef.current = true;
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await quizClient.submitAttempt(qid as string, answers);
      router.push(`/courses/${cid}/quizzes/${qid}/preview`);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || "Failed to submit quiz");
      setSubmitting(false);
    }
  };

  const checkAccessCode = () => {
    if (accessCodeInput === quiz?.accessCode) {
      setAccessGranted(true);
    } else {
      setError("Incorrect access code.");
    }
  };

  if (!quiz) return <div className="p-3">Loading...</div>;

  if (!accessGranted) {
    return (
      <div className="p-3" style={{ maxWidth: 400, margin: "0 auto" }}>
        <h3>{quiz.title}</h3>
        <p>This quiz requires an access code.</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <FormControl placeholder="Enter access code" className="mb-2"
          value={accessCodeInput} onChange={(e) => setAccessCodeInput(e.target.value)} />
        <Button variant="danger" onClick={checkAccessCode}>Submit Code</Button>
      </div>
    );
  }

  const formatTime = (s: number): string => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const oneAtATime = quiz.oneQuestionAtATime;
  const displayQuestions = oneAtATime ? [questions[currentIndex]] : questions;

  return (
    <div id="wd-quiz-attempt" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{quiz.title}</h3>
        {timeLeft !== null && (
          <Alert variant={timeLeft < 60 ? "danger" : "secondary"} className="mb-0 py-1 px-3">
            Time Left: <strong>{formatTime(timeLeft)}</strong>
          </Alert>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <p className="text-muted">
        Started: {new Date().toLocaleString()}
      </p>
      {quiz.description && <p>{quiz.description}</p>}

      {displayQuestions.filter(Boolean).map((q: Question, idx: number) => {
        const globalIdx = oneAtATime ? currentIndex : idx;
        return (
          <Card key={q._id} className="mb-3">
            <Card.Header className="d-flex justify-content-between">
              <strong>{q.title || `Question ${globalIdx + 1}`}</strong>
              <span>{q.points} pts</span>
            </Card.Header>
            <Card.Body>
              <p>{q.question}</p>

              {q.type === "Multiple Choice" && (
                <div>
                  {(q.choices || []).map((choice: string, ci: number) => (
                    <Form.Check key={ci} type="radio"
                      name={`q-${q._id}`}
                      label={choice}
                      checked={answers[q._id] === ci}
                      onChange={() => setAnswers({ ...answers, [q._id]: ci })}
                      className="mb-1"
                    />
                  ))}
                </div>
              )}

              {q.type === "True/False" && (
                <div>
                  <Form.Check type="radio" name={`q-${q._id}`} label="True"
                    checked={answers[q._id] === true}
                    onChange={() => setAnswers({ ...answers, [q._id]: true })} className="mb-1" />
                  <Form.Check type="radio" name={`q-${q._id}`} label="False"
                    checked={answers[q._id] === false}
                    onChange={() => setAnswers({ ...answers, [q._id]: false })} className="mb-1" />
                </div>
              )}

              {q.type === "Fill in the Blank" && (
                <FormControl
                  value={String(answers[q._id] || "")}
                  placeholder="Type your answer here"
                  onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
                />
              )}
            </Card.Body>
          </Card>
        );
      })}

      {oneAtATime && questions.length > 0 && (
        <div className="d-flex justify-content-between mb-3">
          <Button variant="outline-secondary" disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}>
            &larr; Previous
          </Button>
          <span className="pt-2 text-muted">
            Question {currentIndex + 1} of {questions.length}
          </span>
          {currentIndex < questions.length - 1 ? (
            <Button variant="outline-secondary"
              onClick={() => setCurrentIndex(currentIndex + 1)}>
              Next &rarr;
            </Button>
          ) : (
            <span />
          )}
        </div>
      )}

      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="danger" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Quiz"}
        </Button>
      </div>
    </div>
  );
}
