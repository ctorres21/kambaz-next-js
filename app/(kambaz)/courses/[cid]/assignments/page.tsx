"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { FaPlus, FaSearch, FaFileAlt, FaCheckCircle, FaTrash } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (aid: string) => {
    setAssignmentToDelete(aid);
    setShowDialog(true);
  };
  const confirmDelete = () => {
    if (assignmentToDelete) dispatch(deleteAssignment(assignmentToDelete));
    setShowDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex align-items-center mb-3">
        <InputGroup style={{ maxWidth: 420 }}>
          <InputGroup.Text className="bg-white"><FaSearch className="text-secondary" /></InputGroup.Text>
          <FormControl placeholder="Search for Assignments" id="wd-search-assignment" />
        </InputGroup>
        <div className="ms-auto text-nowrap">
          <Button id="wd-add-assignment-group" variant="secondary" className="me-2">
            <FaPlus className="me-2" />Group</Button>
          <Link href={`/courses/${cid}/assignments/new`} className="btn btn-danger" id="wd-add-assignment">
            <FaPlus className="me-2" />Assignment</Link>
        </div>
      </div>

      <div className="d-flex align-items-center bg-secondary text-white p-2 ps-3 mb-2">
        <BsGripVertical className="me-2 fs-4" />
        <h3 id="wd-assignments-title" className="m-0 fs-5">ASSIGNMENTS</h3>
        <div className="ms-auto">
          <span className="badge bg-light text-dark me-2">40% of Total</span>
          <FaPlus className="me-2" /><IoEllipsisVertical className="fs-4" />
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        {assignments
          .filter((a: any) => a.course === cid)
          .map((a: any) => (
            <ListGroupItem key={a._id} className="wd-assignment-list-item d-flex align-items-start"
              style={{ borderLeft: "6px solid #198754" }}>
              <BsGripVertical className="me-2 fs-4 text-secondary mt-1" />
              <FaFileAlt className="me-2 fs-4 text-success mt-1" />
              <div className="flex-grow-1">
                <Link href={`/courses/${cid}/assignments/${a._id}`}
                  className="wd-assignment-link text-decoration-none fw-bold" style={{ color: "#0f172a" }}>
                  {a.title}</Link>
                <div className="text-secondary small">
                  Multiple Modules | <span className="fw-semibold">Not available until</span> {a.availableFrom} |{" "}
                  <span className="fw-semibold">Due</span> {a.dueDate} | {a.points} pts
                </div>
              </div>
              <FaCheckCircle className="text-success me-2 mt-1" />
              <FaTrash className="text-danger me-2 mt-1" style={{ cursor: "pointer" }}
                onClick={() => handleDeleteClick(a._id)} />
              <IoEllipsisVertical className="fs-4 text-secondary mt-1" />
            </ListGroupItem>
          ))}
      </ListGroup>

      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to remove this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDialog(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
