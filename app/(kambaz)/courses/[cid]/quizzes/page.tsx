"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes, updateQuiz as updateQuizInStore, deleteQuiz as deleteQuizFromStore } from "./reducer";
import * as quizClient from "./client";
import { Quiz } from "./client";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaPlus, FaCheckCircle, FaBan, FaTrash, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import {
  ListGroup, ListGroupItem, Button, FormControl, Modal, Dropdown,
} from "react-bootstrap";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [latestScores, setLatestScores] = useState<Record<string, number>>({});

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchQuizzes = async () => {
    const data = await quizClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  };

  const fetchLatestScores = async (quizList: Quiz[]) => {
    if (isFaculty) return;
    const scores: Record<string, number> = {};
    for (const q of quizList) {
      try {
        const attempt = await quizClient.getLatestAttempt(q._id);
        if (attempt) {
          scores[q._id] = attempt.score;
        }
      } catch {
        /* no attempt yet */
      }
    }
    setLatestScores(scores);
  };

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  useEffect(() => {
    if (quizzes.length > 0 && !isFaculty) {
      fetchLatestScores(quizzes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizzes.length]);

  const handleAddQuiz = async () => {
    const newQuiz = await quizClient.createQuiz(cid as string, {
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
    dispatch(setQuizzes([...quizzes, newQuiz]));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}`);
  };

  const handleDelete = async () => {
    if (quizToDelete) {
      await quizClient.deleteQuiz(quizToDelete._id);
      dispatch(deleteQuizFromStore(quizToDelete._id));
    }
    setShowDeleteDialog(false);
    setQuizToDelete(null);
  };

  const togglePublish = async (quiz: Quiz) => {
    const updated: Quiz = { ...quiz, published: !quiz.published };
    await quizClient.updateQuiz(updated);
    dispatch(updateQuizInStore(updated));
  };

  const getAvailability = (quiz: Quiz): string => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
    if (until && now > until) return "Closed";
    if (available && now < available) {
      return `Not available until ${new Date(quiz.availableDate).toLocaleDateString()}`;
    }
    if (available && until && now >= available && now <= until) return "Available";
    if (available && !until && now >= available) return "Available";
    return "Available";
  };

  const filteredQuizzes = quizzes.filter((q: Quiz) => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (isFaculty) return matchesSearch;
    return matchesSearch && q.published;
  });

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="position-relative w-50">
          <FaSearch className="position-absolute" style={{ top: "10px", left: "10px" }} />
          <FormControl placeholder="Search for Quiz" className="ps-5"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        {isFaculty && (
          <Button variant="danger" onClick={handleAddQuiz}>
            <FaPlus className="me-1" />Quiz
          </Button>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-quiz-list">
        <ListGroupItem className="p-0 mb-1 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <strong>Assignment Quizzes</strong>
            </div>
          </div>
        </ListGroupItem>

        {filteredQuizzes.length === 0 && (
          <ListGroupItem className="p-4 text-center text-muted">
            {isFaculty
              ? "No quizzes yet. Click the + Quiz button to create one."
              : "No quizzes available."}
          </ListGroupItem>
        )}

        {filteredQuizzes.map((quiz: Quiz) => (
          <ListGroupItem key={quiz._id} className="p-3 ps-1 d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <MdQuiz className="text-success me-3 fs-4" />
            <div className="flex-fill">
              <Link
                href={isFaculty
                  ? `/courses/${cid}/quizzes/${quiz._id}`
                  : (quiz.published ? `/courses/${cid}/quizzes/${quiz._id}` : "#")}
                className="text-decoration-none text-dark fw-bold">
                {quiz.title}
              </Link>
              <br />
              <small className="text-muted">
                <strong>{getAvailability(quiz)}</strong>
                {quiz.dueDate && <> | <strong>Due</strong> {new Date(quiz.dueDate).toLocaleDateString()}</>}
                {" | "}{quiz.points || 0} pts
                {" | "}{quiz.numberOfQuestions || 0} Questions
                {!isFaculty && latestScores[quiz._id] !== undefined && (
                  <> | <strong>Score:</strong> {latestScores[quiz._id]}</>
                )}
              </small>
            </div>
            <div className="d-flex align-items-center">
              {isFaculty && (
                <>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => togglePublish(quiz)}
                    title={quiz.published ? "Click to unpublish" : "Click to publish"}>
                    {quiz.published
                      ? <FaCheckCircle className="text-success me-2 fs-5" />
                      : <FaBan className="text-secondary me-2 fs-5" />}
                  </span>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" className="text-dark p-0 border-0"
                      id={`quiz-menu-${quiz._id}`}>
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`)}>
                        <FaPencilAlt className="me-2" />Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => { setQuizToDelete(quiz); setShowDeleteDialog(true); }}>
                        <FaTrash className="me-2" />Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => togglePublish(quiz)}>
                        {quiz.published ? <><FaBan className="me-2" />Unpublish</> : <><FaCheckCircle className="me-2" />Publish</>}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      <Modal show={showDeleteDialog} onHide={() => setShowDeleteDialog(false)}>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the quiz <strong>{quizToDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
