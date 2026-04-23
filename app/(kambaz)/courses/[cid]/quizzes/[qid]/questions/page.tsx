"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { setQuizzes } from "../../reducer";
import * as quizClient from "../../client";
import {
  Button, FormControl, Form, Nav, Card, ListGroup, ListGroupItem, Row, Col,
} from "react-bootstrap";
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";

function MultipleChoiceEditor({ question, onChange }: { question: any; onChange: (q: any) => void }) {
  const choices = question.choices || [""];
  const addChoice = () => onChange({ ...question, choices: [...choices, ""] });
  const removeChoice = (i: number) => {
    const updated = choices.filter((_: any, idx: number) => idx !== i);
    const ca = question.correctAnswer >= updated.length ? 0 : question.correctAnswer;
    onChange({ ...question, choices: updated, correctAnswer: i === question.correctAnswer ? 0 : (i < question.correctAnswer ? ca - 1 : ca) });
  };
  const updateChoice = (i: number, val: string) => {
    const updated = [...choices]; updated[i] = val;
    onChange({ ...question, choices: updated });
  };
  return (
    <div>
      <label className="form-label fw-bold">Answers:</label>
      {choices.map((c: string, i: number) => (
        <div key={i} className="d-flex align-items-center mb-2">
          <Form.Check type="radio" name={`correct-${question._id || "new"}`}
            checked={question.correctAnswer === i}
            onChange={() => onChange({ ...question, correctAnswer: i })}
            label={question.correctAnswer === i ? "Correct Answer" : "Possible Answer"}
            className="me-2" style={{ minWidth: 140 }} />
          <FormControl value={c} className="me-2"
            onChange={(e) => updateChoice(i, e.target.value)} />
          {choices.length > 1 && (
            <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => removeChoice(i)} />
          )}
        </div>
      ))}
      <Button variant="link" size="sm" onClick={addChoice}><FaPlus className="me-1" />Add Another Answer</Button>
    </div>
  );
}

function TrueFalseEditor({ question, onChange }: { question: any; onChange: (q: any) => void }) {
  return (
    <div>
      <label className="form-label fw-bold">Answers:</label>
      <Form.Check type="radio" name={`tf-${question._id || "new"}`} label="True"
        checked={question.correctAnswer === true}
        onChange={() => onChange({ ...question, correctAnswer: true })} />
      <Form.Check type="radio" name={`tf-${question._id || "new"}`} label="False"
        checked={question.correctAnswer === false}
        onChange={() => onChange({ ...question, correctAnswer: false })} />
    </div>
  );
}

function FillInBlankEditor({ question, onChange }: { question: any; onChange: (q: any) => void }) {
  const answers = question.correctAnswers || [""];
  const addAnswer = () => onChange({ ...question, correctAnswers: [...answers, ""] });
  const removeAnswer = (i: number) => onChange({ ...question, correctAnswers: answers.filter((_: any, idx: number) => idx !== i) });
  const updateAnswer = (i: number, val: string) => {
    const updated = [...answers]; updated[i] = val;
    onChange({ ...question, correctAnswers: updated });
  };
  return (
    <div>
      <label className="form-label fw-bold">Possible Answers:</label>
      {answers.map((a: string, i: number) => (
        <div key={i} className="d-flex align-items-center mb-2">
          <span className="me-2" style={{ minWidth: 110 }}>Possible Answer:</span>
          <FormControl value={a} className="me-2"
            onChange={(e) => updateAnswer(i, e.target.value)} />
          {answers.length > 1 && (
            <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => removeAnswer(i)} />
          )}
        </div>
      ))}
      <Button variant="link" size="sm" onClick={addAnswer}><FaPlus className="me-1" />Add Another Answer</Button>
    </div>
  );
}

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);

  const [questions, setQuestions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const qs = await quizClient.findQuestionsForQuiz(qid as string);
      setQuestions(qs);
    };
    fetch();
  }, [qid]);

  const totalPoints = questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);

  const handleNewQuestion = () => {
    const tempId = `temp-${Date.now()}`;
    const newQ: any = {
      _id: tempId,
      quiz: qid,
      title: "New Question",
      type: "Multiple Choice",
      points: 1,
      question: "",
      choices: ["", "", "", ""],
      correctAnswer: 0,
      _isNew: true,
    };
    setQuestions([...questions, newQ]);
    setEditingId(tempId);
    setEditingQuestion({ ...newQ });
  };

  const startEdit = (q: any) => {
    setEditingId(q._id);
    setEditingQuestion({ ...q });
  };

  const cancelEdit = (q: any) => {
    if (q._isNew) {
      setQuestions(questions.filter((qq: any) => qq._id !== q._id));
    }
    setEditingId(null);
    setEditingQuestion(null);
  };

  const handleTypeChange = (type: string) => {
    if (!editingQuestion) return;
    const base = { ...editingQuestion, type };
    if (type === "Multiple Choice") {
      base.choices = base.choices || ["", "", "", ""];
      base.correctAnswer = typeof base.correctAnswer === "number" ? base.correctAnswer : 0;
      delete base.correctAnswers;
    } else if (type === "True/False") {
      base.correctAnswer = typeof base.correctAnswer === "boolean" ? base.correctAnswer : true;
      delete base.choices;
      delete base.correctAnswers;
    } else if (type === "Fill in the Blank") {
      base.correctAnswers = base.correctAnswers || [""];
      delete base.choices;
      delete base.correctAnswer;
    }
    setEditingQuestion(base);
  };

  const saveQuestion = async () => {
    if (!editingQuestion) return;
    const { _isNew, ...data } = editingQuestion;
    let saved;
    if (_isNew) {
      const { _id, ...rest } = data;
      saved = await quizClient.createQuestion(qid as string, rest);
      setQuestions(questions.map((q: any) => q._id === editingQuestion._id ? saved : q));
    } else {
      saved = await quizClient.updateQuestion(data);
      setQuestions(questions.map((q: any) => q._id === saved._id ? saved : q));
    }
    // Update quiz points and numberOfQuestions
    const updatedQuestions = questions.map((q: any) => q._id === editingQuestion._id ? saved : q);
    const pts = updatedQuestions.reduce((s: number, q: any) => s + (q.points || 0), 0);
    await quizClient.updateQuiz({ _id: qid, points: pts, numberOfQuestions: updatedQuestions.length });
    const updatedQuizzes = quizzes.map((q: any) =>
      q._id === qid ? { ...q, points: pts, numberOfQuestions: updatedQuestions.length } : q
    );
    dispatch(setQuizzes(updatedQuizzes));

    setEditingId(null);
    setEditingQuestion(null);
  };

  const deleteQuestion = async (q: any) => {
    if (!q._isNew) {
      await quizClient.deleteQuestion(q._id);
    }
    const updated = questions.filter((qq: any) => qq._id !== q._id);
    setQuestions(updated);
    const pts = updated.reduce((s: number, qq: any) => s + (qq.points || 0), 0);
    await quizClient.updateQuiz({ _id: qid, points: pts, numberOfQuestions: updated.length });
    dispatch(setQuizzes(quizzes.map((qq: any) =>
      qq._id === qid ? { ...qq, points: pts, numberOfQuestions: updated.length } : qq
    )));
    if (editingId === q._id) { setEditingId(null); setEditingQuestion(null); }
  };

  const handleCancel = () => router.push(`/courses/${cid}/quizzes`);
  const handleSave = () => router.push(`/courses/${cid}/quizzes/${qid}`);

  return (
    <div id="wd-quiz-questions-editor" className="p-3">
      <div className="d-flex justify-content-end mb-2 text-muted">
        Points {totalPoints}
      </div>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active>Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      <ListGroup className="mb-3">
        {questions.map((q: any) => (
          <ListGroupItem key={q._id} className="p-3">
            {editingId === q._id && editingQuestion ? (
              <Card>
                <Card.Body>
                  <Row className="mb-3 align-items-center">
                    <Col xs={4}>
                      <FormControl value={editingQuestion.title} placeholder="Question Title"
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })} />
                    </Col>
                    <Col xs={4}>
                      <Form.Select value={editingQuestion.type}
                        onChange={(e) => handleTypeChange(e.target.value)}>
                        <option>Multiple Choice</option>
                        <option>True/False</option>
                        <option>Fill in the Blank</option>
                      </Form.Select>
                    </Col>
                    <Col xs={4} className="text-end">
                      <span className="me-2">pts:</span>
                      <FormControl type="number" style={{ width: 70, display: "inline-block" }}
                        value={editingQuestion.points}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, points: parseInt(e.target.value) || 0 })} />
                    </Col>
                  </Row>

                  <small className="text-muted d-block mb-2">
                    {editingQuestion.type === "Multiple Choice" && "Enter your question and multiple answers, then select the one correct answer."}
                    {editingQuestion.type === "True/False" && "Enter your question text, then select if True or False is the correct answer."}
                    {editingQuestion.type === "Fill in the Blank" && "Enter your question text, then define all possible correct answers for the blank."}
                  </small>

                  <label className="form-label fw-bold">Question:</label>
                  <FormControl as="textarea" rows={3} className="mb-3"
                    value={editingQuestion.question}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })} />

                  {editingQuestion.type === "Multiple Choice" && (
                    <MultipleChoiceEditor question={editingQuestion} onChange={setEditingQuestion} />
                  )}
                  {editingQuestion.type === "True/False" && (
                    <TrueFalseEditor question={editingQuestion} onChange={setEditingQuestion} />
                  )}
                  {editingQuestion.type === "Fill in the Blank" && (
                    <FillInBlankEditor question={editingQuestion} onChange={setEditingQuestion} />
                  )}

                  <hr />
                  <div className="d-flex">
                    <Button variant="secondary" size="sm" className="me-2"
                      onClick={() => cancelEdit(q)}>Cancel</Button>
                    <Button variant="danger" size="sm" onClick={saveQuestion}>
                      {q._isNew ? "Save Question" : "Update Question"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <div className="d-flex align-items-start">
                <div className="flex-fill">
                  <div className="d-flex justify-content-between">
                    <strong>{q.title}</strong>
                    <span className="text-muted">{q.points} pts</span>
                  </div>
                  <small className="text-muted">{q.type}</small>
                  <p className="mb-0 mt-1">{q.question}</p>
                </div>
                <div className="d-flex ms-3">
                  <FaPencilAlt className="text-primary me-2" style={{ cursor: "pointer" }}
                    onClick={() => startEdit(q)} />
                  <FaTrash className="text-danger" style={{ cursor: "pointer" }}
                    onClick={() => deleteQuestion(q)} />
                </div>
              </div>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>

      <div className="text-center mb-4">
        <Button variant="outline-secondary" onClick={handleNewQuestion}>
          <FaPlus className="me-1" />New Question
        </Button>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>Cancel</Button>
        <Button variant="danger" onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
