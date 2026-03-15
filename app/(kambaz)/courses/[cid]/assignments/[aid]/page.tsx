"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const existingAssignment = assignments.find((a: any) => a._id === aid);
  const isNew = aid === "new";

  const [assignment, setAssignment] = useState<any>(
    existingAssignment || {
      title: "New Assignment", description: "New Assignment Description",
      points: 100, course: cid, dueDate: "", availableFrom: "", availableUntil: "",
    }
  );

  useEffect(() => {
    if (existingAssignment) setAssignment(existingAssignment);
  }, [existingAssignment]);

  const handleSave = () => {
    if (isNew) {
      dispatch(addAssignment({ ...assignment, course: cid }));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control as="textarea" rows={10} value={assignment.description || ""}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />
        </Form.Group>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" value={assignment.points}
                onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="wd-assignment-group">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option><option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option><option value="PROJECT">PROJECT</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="wd-submission-type">
              <Form.Label>Submission Type</Form.Label>
              <Form.Select defaultValue="ONLINE">
                <option value="ONLINE">Online</option><option value="ON_PAPER">On Paper</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <div className="border rounded p-3">
              <div className="fw-bold mb-2">Assign</div>
              <Form.Group className="mb-3" controlId="wd-assign-to">
                <Form.Label>Assign to</Form.Label>
                <Form.Control defaultValue="Everyone" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="wd-due-date">
                <Form.Label>Due</Form.Label>
                <Form.Control type="date" value={assignment.dueDate || ""}
                  onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })} />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="wd-available-from">
                    <Form.Label>Available from</Form.Label>
                    <Form.Control type="date" value={assignment.availableFrom || ""}
                      onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="wd-available-until">
                    <Form.Label>Until</Form.Label>
                    <Form.Control type="date" value={assignment.availableUntil || ""}
                      onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/assignments`)}>Cancel</Button>
          <Button variant="danger" onClick={handleSave}>Save</Button>
        </div>
      </Form>
    </div>
  );
}
