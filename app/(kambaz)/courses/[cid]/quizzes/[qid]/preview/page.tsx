"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as quizClient from "../../client";
import {
  Button, Card, Form, FormControl, Alert,
} from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // For students viewing last attempt
  const [viewingAttempt, setViewingAttempt] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const q = await quizClient.findQuizById(qid as string);
      setQuiz(q);
      const qs = await quizClient.findQuestionsForQuiz(qid as string);
      setQuestions(qs);

      // Students viewing their last attempt
      if (!isFaculty) {
        try {
          const attempt = await quizClient.getLatestAttempt(qid as string);
          if (attempt) {
            setViewingAttempt(attempt);
            setAnswers(attempt.answers || {});
            setResults(attempt.results || {});
            setScore(attempt.score);
            setTotalPoints(attempt.totalPoints);
            setSubmitted(true);
          }
        } catch { /* no attempt */ }
      }
    };
    fetch();
  }, [qid]);

  const handleSubmit = () => {
    // Grade locally for faculty preview (don't save to DB)
    let s = 0;
    const r: any = {};
    for (const q of questions) {
      const userAnswer = answers[q._id];
      let correct = false;
      if (q.type === "Multiple Choice") {
        correct = userAnswer === q.correctAnswer;
      } else if (q.type === "True/False") {
        correct = userAnswer === q.correctAnswer;
      } else if (q.type === "Fill in the Blank") {
        correct = (q.correctAnswers || []).some(
          (a: string) => a.toLowerCase().trim() === String(userAnswer || "").toLowerCase().trim()
        );
      }
      if (correct) s += q.points;
      r[q._id] = { correct, userAnswer, points: correct ? q.points : 0 };
    }
    setScore(s);
    setTotalPoints(quiz.points);
    setResults(r);
    setSubmitted(true);
  };

  if (!quiz) return <div className="p-3">Loading...</div>;

  const oneAtATime = quiz.oneQuestionAtATime && !submitted;
  const displayQuestions = oneAtATime ? [questions[currentIndex]] : questions;

  return (
    <div id="wd-quiz-preview" className="p-3">
      <h3>{quiz.title}</h3>

      {isFaculty && !submitted && (
        <Alert variant="info">
          This is a preview of the published version of the quiz.
        </Alert>
      )}
      {!isFaculty && viewingAttempt && (
        <Alert variant="info">
          Viewing your last attempt (submitted {new Date(viewingAttempt.submittedAt).toLocaleString()}).
        </Alert>
      )}

      {submitted && (
        <Alert variant={score === totalPoints ? "success" : "warning"}>
          <strong>Score: {score} / {totalPoints}</strong>
        </Alert>
      )}

      {quiz.description && !submitted && <p className="text-muted mb-3">{quiz.description}</p>}

      {displayQuestions.filter(Boolean).map((q: any, idx: number) => {
        const qResult = results?.[q._id];
        const globalIdx = oneAtATime ? currentIndex : idx;
        return (
          <Card key={q._id} className={`mb-3 ${submitted && qResult ? (qResult.correct ? "border-success" : "border-danger") : ""}`}>
            <Card.Header className="d-flex justify-content-between">
              <span>
                {submitted && qResult && (
                  qResult.correct
                    ? <FaCheck className="text-success me-2" />
                    : <FaTimes className="text-danger me-2" />
                )}
                <strong>{q.title || `Question ${globalIdx + 1}`}</strong>
              </span>
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
                      disabled={submitted}
                      checked={answers[q._id] === ci}
                      onChange={() => setAnswers({ ...answers, [q._id]: ci })}
                      className={`mb-1 ${submitted && ci === q.correctAnswer ? "text-success fw-bold" : ""} ${submitted && answers[q._id] === ci && ci !== q.correctAnswer ? "text-danger" : ""}`}
                    />
                  ))}
                </div>
              )}

              {q.type === "True/False" && (
                <div>
                  <Form.Check type="radio" name={`q-${q._id}`} label="True"
                    disabled={submitted}
                    checked={answers[q._id] === true}
                    onChange={() => setAnswers({ ...answers, [q._id]: true })}
                    className={`mb-1 ${submitted && q.correctAnswer === true ? "text-success fw-bold" : ""}`}
                  />
                  <Form.Check type="radio" name={`q-${q._id}`} label="False"
                    disabled={submitted}
                    checked={answers[q._id] === false}
                    onChange={() => setAnswers({ ...answers, [q._id]: false })}
                    className={`mb-1 ${submitted && q.correctAnswer === false ? "text-success fw-bold" : ""}`}
                  />
                </div>
              )}

              {q.type === "Fill in the Blank" && (
                <div>
                  <FormControl
                    disabled={submitted}
                    value={answers[q._id] || ""}
                    placeholder="Type your answer here"
                    onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
                  />
                  {submitted && qResult && !qResult.correct && (
                    <small className="text-success mt-1 d-block">
                      Accepted answers: {(q.correctAnswers || []).join(", ")}
                    </small>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}

      {/* Navigation for one-at-a-time mode */}
      {oneAtATime && !submitted && questions.length > 0 && (
        <div className="d-flex justify-content-between mb-3">
          <Button variant="outline-secondary" disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}>
            &larr; Previous
          </Button>
          <span className="pt-2 text-muted">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <Button variant="outline-secondary" disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex(currentIndex + 1)}>
            Next &rarr;
          </Button>
        </div>
      )}

      <hr />
      <div className="d-flex justify-content-end">
        {!submitted && (
          <Button variant="danger" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        )}
        {submitted && isFaculty && (
          <Button variant="outline-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/questions`)}>
            Keep Editing This Quiz
          </Button>
        )}
        <Button variant="secondary" className="ms-2"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
          Back to Quiz Details
        </Button>
      </div>
    </div>
  );
}
