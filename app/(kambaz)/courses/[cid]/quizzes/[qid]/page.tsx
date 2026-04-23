"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as quizClient from "../client";
import { Button, Table } from "react-bootstrap";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetch = async () => {
      const q = await quizClient.findQuizById(qid as string);
      setQuiz(q);
      if (!isFaculty) {
        try {
          const attempts = await quizClient.findAttemptsForQuiz(qid as string);
          setAttemptCount(attempts.length);
          const latest = await quizClient.getLatestAttempt(qid as string);
          if (latest) setLatestAttempt(latest);
        } catch { /* no attempts */ }
      }
    };
    fetch();
  }, [qid]);

  if (!quiz) return <div className="p-3">Loading...</div>;

  const maxAttempts = quiz.multipleAttempts ? (quiz.howManyAttempts || 1) : 1;
  const canTakeQuiz = isFaculty || attemptCount < maxAttempts;

  const formatDate = (d: string) => d ? new Date(d).toLocaleString() : "—";

  return (
    <div id="wd-quiz-details" className="p-3">
      {isFaculty && (
        <div className="d-flex justify-content-center mb-3">
          <Button variant="outline-secondary" className="me-2"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
            Preview
          </Button>
          <Button variant="outline-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
            Edit
          </Button>
        </div>
      )}

      <hr />
      <h3>{quiz.title}</h3>

      {isFaculty ? (
        <Table borderless className="mt-3" style={{ maxWidth: 600 }}>
          <tbody>
            <tr><td className="text-end fw-bold" style={{ width: "40%" }}>Quiz Type</td><td>{quiz.quizType}</td></tr>
            <tr><td className="text-end fw-bold">Points</td><td>{quiz.points}</td></tr>
            <tr><td className="text-end fw-bold">Assignment Group</td><td>{quiz.assignmentGroup}</td></tr>
            <tr><td className="text-end fw-bold">Shuffle Answers</td><td>{quiz.shuffleAnswers ? "Yes" : "No"}</td></tr>
            <tr><td className="text-end fw-bold">Time Limit</td><td>{quiz.timeLimit} Minutes</td></tr>
            <tr><td className="text-end fw-bold">Multiple Attempts</td><td>{quiz.multipleAttempts ? "Yes" : "No"}</td></tr>
            {quiz.multipleAttempts && (
              <tr><td className="text-end fw-bold">How Many Attempts</td><td>{quiz.howManyAttempts}</td></tr>
            )}
            <tr><td className="text-end fw-bold">View Responses</td><td>Always</td></tr>
            <tr><td className="text-end fw-bold">Show Correct Answers</td><td>{quiz.showCorrectAnswers || "Immediately"}</td></tr>
            <tr><td className="text-end fw-bold">One Question at a Time</td><td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td></tr>
            <tr><td className="text-end fw-bold">Require Respondus LockDown Browser</td><td>No</td></tr>
            <tr><td className="text-end fw-bold">Required to View Quiz Results</td><td>No</td></tr>
            <tr><td className="text-end fw-bold">Webcam Required</td><td>{quiz.webcamRequired ? "Yes" : "No"}</td></tr>
            <tr><td className="text-end fw-bold">Lock Questions After Answering</td><td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td></tr>
          </tbody>
        </Table>
      ) : (
        <>
          {quiz.description && <p className="mt-2">{quiz.description}</p>}
          <Table borderless className="mt-3" style={{ maxWidth: 400 }}>
            <tbody>
              <tr><td className="fw-bold">Points</td><td>{quiz.points}</td></tr>
              <tr><td className="fw-bold">Questions</td><td>{quiz.numberOfQuestions}</td></tr>
              <tr><td className="fw-bold">Time Limit</td><td>{quiz.timeLimit} Minutes</td></tr>
              <tr><td className="fw-bold">Attempts Allowed</td><td>{maxAttempts}</td></tr>
              <tr><td className="fw-bold">Attempts Used</td><td>{attemptCount}</td></tr>
              {latestAttempt && (
                <tr><td className="fw-bold">Last Score</td><td>{latestAttempt.score} / {latestAttempt.totalPoints}</td></tr>
              )}
            </tbody>
          </Table>
        </>
      )}

      <Table bordered className="mt-3" style={{ maxWidth: 600 }}>
        <thead>
          <tr>
            <th>Due</th><th>Available from</th><th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>{formatDate(quiz.availableDate)}</td>
            <td>{formatDate(quiz.untilDate)}</td>
          </tr>
        </tbody>
      </Table>

      {!isFaculty && (
        <div className="mt-4">
          {canTakeQuiz ? (
            <Button variant="danger" size="lg"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/attempt`)}>
              {attemptCount === 0 ? "Start Quiz" : "Retake Quiz"}
            </Button>
          ) : (
            <div className="alert alert-info">
              You have used all {maxAttempts} attempt(s) for this quiz.
            </div>
          )}
          {latestAttempt && (
            <Button variant="outline-secondary" className="ms-2" size="lg"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
              View Last Attempt
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
