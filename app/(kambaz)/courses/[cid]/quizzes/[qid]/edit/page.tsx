"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { setQuizzes } from "../../reducer";
import * as quizClient from "../../client";
import {
  Button, FormControl, Form, Row, Col, Nav,
} from "react-bootstrap";

export default function QuizDetailsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);

  const [quiz, setQuiz] = useState<any>({
    title: "Unnamed Quiz",
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    points: 0,
    published: false,
    numberOfQuestions: 0,
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const q = await quizClient.findQuizById(qid as string);
        setQuiz(q);
      } catch { /* new quiz */ }
    };
    fetchQuiz();
  }, [qid]);

  const handleSave = async (publish?: boolean) => {
    const toSave = publish !== undefined ? { ...quiz, published: publish } : quiz;
    const updated = await quizClient.updateQuiz(toSave);
    dispatch(setQuizzes(quizzes.map((q: any) => q._id === updated._id ? updated : q)));
    if (publish) {
      router.push(`/courses/${cid}/quizzes`);
    } else {
      router.push(`/courses/${cid}/quizzes/${qid}`);
    }
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  const toDatetimeLocal = (val: string) => {
    if (!val) return "";
    try { return new Date(val).toISOString().slice(0, 16); }
    catch { return ""; }
  };

  return (
    <div id="wd-quiz-editor" className="p-3">
      <div className="d-flex justify-content-end mb-2 text-muted">
        Points {quiz.points} &nbsp;|&nbsp; {quiz.published ? "Published" : "Not Published"}
      </div>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link active>Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/questions`)}>
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Title */}
      <FormControl className="mb-3" value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />

      {/* Description */}
      <label className="form-label fw-bold">Quiz Instructions</label>
      <FormControl as="textarea" rows={4} className="mb-3" value={quiz.description}
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />

      {/* Quiz Type */}
      <Row className="mb-3">
        <Col xs={4} className="text-end pt-2"><label>Quiz Type</label></Col>
        <Col xs={8}>
          <Form.Select value={quiz.quizType}
            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Assignment Group */}
      <Row className="mb-3">
        <Col xs={4} className="text-end pt-2"><label>Assignment Group</label></Col>
        <Col xs={8}>
          <Form.Select value={quiz.assignmentGroup}
            onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECT">Project</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Options */}
      <Row className="mb-3">
        <Col xs={4} className="text-end pt-2"><label>Options</label></Col>
        <Col xs={8}>
          <Form.Check type="checkbox" label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} />

          <div className="d-flex align-items-center mt-2">
            <Form.Check type="checkbox" label="Time Limit"
              checked={quiz.timeLimit > 0}
              onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })} />
            {quiz.timeLimit > 0 && (
              <FormControl type="number" className="ms-2" style={{ width: 80 }}
                value={quiz.timeLimit}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })} />
            )}
            {quiz.timeLimit > 0 && <span className="ms-1">Minutes</span>}
          </div>

          <Form.Check type="checkbox" label="Allow Multiple Attempts" className="mt-2"
            checked={quiz.multipleAttempts}
            onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked, howManyAttempts: e.target.checked ? 3 : 1 })} />
          {quiz.multipleAttempts && (
            <div className="ms-4 mt-1 d-flex align-items-center">
              <label className="me-2">How Many Attempts:</label>
              <FormControl type="number" style={{ width: 80 }}
                value={quiz.howManyAttempts}
                onChange={(e) => setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) || 1 })} />
            </div>
          )}

          <Form.Check type="checkbox" label="One Question at a Time" className="mt-2"
            checked={quiz.oneQuestionAtATime}
            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })} />

          <Form.Check type="checkbox" label="Webcam Required" className="mt-2"
            checked={quiz.webcamRequired}
            onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })} />

          <Form.Check type="checkbox" label="Lock Questions After Answering" className="mt-2"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })} />
        </Col>
      </Row>

      {/* Show Correct Answers */}
      <Row className="mb-3">
        <Col xs={4} className="text-end pt-2"><label>Show Correct Answers</label></Col>
        <Col xs={8}>
          <Form.Select value={quiz.showCorrectAnswers}
            onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}>
            <option>Immediately</option>
            <option>After Due Date</option>
            <option>Never</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Access Code */}
      <Row className="mb-3">
        <Col xs={4} className="text-end pt-2"><label>Access Code</label></Col>
        <Col xs={8}>
          <FormControl value={quiz.accessCode}
            placeholder="Leave blank for no code"
            onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} />
        </Col>
      </Row>

      {/* Dates */}
      <Row className="mb-3">
        <Col xs={4} className="text-end pt-2"><label>Assign</label></Col>
        <Col xs={8}>
          <div className="border rounded p-3">
            <label className="form-label fw-bold">Due</label>
            <FormControl type="datetime-local" className="mb-3"
              value={toDatetimeLocal(quiz.dueDate)}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })} />
            <Row>
              <Col>
                <label className="form-label fw-bold">Available from</label>
                <FormControl type="datetime-local"
                  value={toDatetimeLocal(quiz.availableDate)}
                  onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })} />
              </Col>
              <Col>
                <label className="form-label fw-bold">Until</label>
                <FormControl type="datetime-local"
                  value={toDatetimeLocal(quiz.untilDate)}
                  onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>Cancel</Button>
        <Button variant="danger" className="me-2" onClick={() => handleSave(true)}>Save &amp; Publish</Button>
        <Button variant="danger" onClick={() => handleSave()}>Save</Button>
      </div>
    </div>
  );
}
