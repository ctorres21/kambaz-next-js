"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setAssignments } from "./reducer";
import * as coursesClient from "../../client";
import { BsGripVertical } from "react-icons/bs";
import { FaTrash, FaCheckCircle, FaSearch, FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
import {
  ListGroup, ListGroupItem, Button, FormControl, Modal,
} from "react-bootstrap";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  const fetchAssignments = async () => {
    const data = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(data));
  };
  useEffect(() => { fetchAssignments(); }, []);

  const confirmDelete = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (assignmentToDelete) {
      await coursesClient.deleteAssignment(assignmentToDelete._id);
      dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentToDelete._id)));
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="position-relative w-50">
          <FaSearch className="position-absolute" style={{ top: "10px", left: "10px" }} />
          <FormControl placeholder="Search for Assignment" className="ps-5" />
        </div>
        {isFaculty && (
          <div>
            <Button variant="secondary" className="me-1">
              <FaPlus className="me-1" />Group
            </Button>
            <Link href={`/courses/${cid}/assignments/new`} className="btn btn-danger">
              <FaPlus className="me-1" />Assignment
            </Link>
          </div>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="wd-assignment-list-item p-0 mb-1 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <strong>ASSIGNMENTS</strong>
            </div>
            <div>
              <span className="border rounded-pill px-2 py-1 me-2" style={{ fontSize: "0.8em" }}>
                40% of Total
              </span>
              <FaPlus />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
        </ListGroupItem>

        {assignments.map((a: any) => (
          <ListGroupItem key={a._id}
            className="wd-assignment-list-item p-3 ps-1 d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <MdAssignment className="text-success me-3 fs-4" />
            <div className="flex-fill">
              <Link href={`/courses/${cid}/assignments/${a._id}`}
                className="text-decoration-none text-dark fw-bold">
                {a.title}
              </Link>
              <br />
              <small className="text-muted">
                Multiple Modules
                {a.dueDate && <> | Due {a.dueDate}</>}
                {a.points && <> | {a.points} pts</>}
              </small>
            </div>
            <div className="d-flex align-items-center">
              <FaCheckCircle className="text-success me-2" />
              {isFaculty && (
                <FaTrash className="text-danger me-2" style={{ cursor: "pointer" }}
                  onClick={() => confirmDelete(a)} />
              )}
              <IoEllipsisVertical className="fs-4" />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      <Modal show={showDeleteDialog} onHide={() => setShowDeleteDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the assignment{" "}
          <strong>{assignmentToDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}