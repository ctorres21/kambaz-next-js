"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setAssignments } from "../reducer";
import * as coursesClient from "../../../client";
import { FormControl, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const isNew = aid === "new";
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>({
    title: "New Assignment",
    description: "New Assignment Description",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });

  useEffect(() => {
    if (!isNew && existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [isNew, existingAssignment]);

  const handleSave = async () => {
    if (isNew) {
      const created = await coursesClient.createAssignment(cid as string, { ...assignment, course: cid });
      dispatch(setAssignments([...assignments, created]));
    } else {
      const updated = await coursesClient.updateAssignment(assignment);
      dispatch(setAssignments(assignments.map((a: any) => (a._id === updated._id ? updated : a))));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignment-editor" className="p-3">
      <label htmlFor="wd-name" className="form-label fw-bold">Assignment Name</label>
      <FormControl id="wd-name" className="mb-3"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />

      <label htmlFor="wd-description" className="form-label fw-bold">Description</label>
      <FormControl as="textarea" id="wd-description" className="mb-3" rows={4}
        value={assignment.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />

      <Row className="mb-3">
        <Col xs={3} className="text-end pt-2">
          <label htmlFor="wd-points" className="form-label">Points</label>
        </Col>
        <Col xs={9}>
          <FormControl id="wd-points" type="number"
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={3} className="text-end pt-2">
          <label className="form-label">Assign</label>
        </Col>
        <Col xs={9}>
          <div className="border rounded p-3">
            <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
            <FormControl id="wd-due-date" type="date" className="mb-3"
              value={assignment.dueDate || ""}
              onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })} />
            <Row>
              <Col>
                <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                <FormControl id="wd-available-from" type="date"
                  value={assignment.availableFrom || ""}
                  onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
              </Col>
              <Col>
                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                <FormControl id="wd-available-until" type="date"
                  value={assignment.availableUntil || ""}
                  onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>Cancel</Button>
        <Button variant="danger" onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}