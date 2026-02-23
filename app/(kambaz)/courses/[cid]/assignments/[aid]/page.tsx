"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../database";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: any) => a._id === aid);

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control defaultValue={assignment?.title || ""} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={10}
            defaultValue={assignment?.description || ""}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" defaultValue={assignment?.points || 100} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-assignment-group">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-display-grade-as">
              <Form.Label>Display Grade as</Form.Label>
              <Form.Select defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-submission-type">
              <Form.Label>Submission Type</Form.Label>
              <Form.Select defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="ON_PAPER">On Paper</option>
              </Form.Select>
            </Form.Group>

            <div className="border rounded p-3">
              <div className="fw-bold mb-2">Online Entry Options</div>
              <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" defaultChecked />
              <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked />
              <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
              <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
              <Form.Check type="checkbox" id="wd-file-uploads" label="File Uploads" />
            </div>
          </Col>

          <Col md={6}>
            <div className="border rounded p-3">
              <div className="fw-bold mb-2">Assign</div>

              <Form.Group className="mb-3" controlId="wd-assign-to">
                <Form.Label>Assign to</Form.Label>
                <Form.Control defaultValue="Everyone" />
              </Form.Group>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="wd-due-date">
                    <Form.Label>Due</Form.Label>
                    <Form.Control type="date" defaultValue={assignment?.dueDate || ""} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="wd-available-from">
                    <Form.Label>Available from</Form.Label>
                    <Form.Control type="date" defaultValue={assignment?.availableFrom || ""} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="wd-available-until">
                    <Form.Label>Until</Form.Label>
                    <Form.Control type="date" defaultValue={assignment?.availableUntil || ""} />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Link href={`/courses/${cid}/assignments`} className="btn btn-secondary">
            Cancel
          </Link>
          <Link href={`/courses/${cid}/assignments`} className="btn btn-danger">
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}