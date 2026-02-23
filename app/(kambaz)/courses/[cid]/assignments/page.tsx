"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../database";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus, FaSearch, FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex align-items-center mb-3">
        <InputGroup style={{ maxWidth: 420 }}>
          <InputGroup.Text className="bg-white">
            <FaSearch className="text-secondary" />
          </InputGroup.Text>
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>
        <div className="ms-auto text-nowrap">
          <Button id="wd-add-assignment-group" variant="secondary" className="me-2">
            <FaPlus className="me-2" />Group
          </Button>
          <Button id="wd-add-assignment" variant="danger">
            <FaPlus className="me-2" />Assignment
          </Button>
        </div>
      </div>

      <div className="d-flex align-items-center bg-secondary text-white p-2 ps-3 mb-2">
        <BsGripVertical className="me-2 fs-4" />
        <h3 id="wd-assignments-title" className="m-0 fs-5">
          ASSIGNMENTS
        </h3>
        <div className="ms-auto">
          <span className="badge bg-light text-dark me-2">40% of Total</span>
          <Button variant="secondary" size="sm" className="text-white border-0">
            <FaPlus />
          </Button>
          <IoEllipsisVertical className="ms-2 fs-4" />
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        {assignments
          .filter((a: any) => a.course === cid)
          .map((a: any) => (
            <ListGroupItem
              key={a._id}
              className="wd-assignment-list-item d-flex align-items-start"
              style={{ borderLeft: "6px solid #198754" }}
            >
              <BsGripVertical className="me-2 fs-4 text-secondary mt-1" />
              <FaFileAlt className="me-2 fs-4 text-success mt-1" />
              <div className="flex-grow-1">
                <Link
                  href={`/courses/${cid}/assignments/${a._id}`}
                  className="wd-assignment-link text-decoration-none fw-bold"
                  style={{ color: "#0f172a" }}
                >
                  {a.title}
                </Link>
                <div className="text-secondary small">
                  Multiple Modules |{" "}
                  <span className="fw-semibold">Not available until</span>{" "}
                  {a.availableFrom} at 12:00am |{" "}
                  <span className="fw-semibold">Due</span> {a.dueDate} at 11:59pm |{" "}
                  {a.points} pts
                </div>
              </div>
              <FaCheckCircle className="text-success me-2 mt-1" />
              <IoEllipsisVertical className="fs-4 text-secondary mt-1" />
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}