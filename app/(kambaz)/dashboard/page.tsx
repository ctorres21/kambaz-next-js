"use client";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import {
  Row, Col, Card, CardImg, CardBody, CardTitle, CardText,
  Button, FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    description: "New Description",
  });
  const [showAllCourses, setShowAllCourses] = useState(false);

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId
    );
  };

  const filteredCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button
          className="btn btn-primary float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "My Courses" : "Enrollments"}
        </button>
      </h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button className="btn btn-primary float-end" id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}>Add</button>
            <button className="btn btn-warning float-end me-2" id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}>Update</button>
          </h5>
          <br />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((c: any) => {
            const enrolled = isEnrolled(c._id);
            return (
              <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={enrolled ? `/courses/${c._id}/home` : "#"}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!enrolled) {
                        e.preventDefault();
                        alert("You must enroll in this course first.");
                      }
                    }}
                  >
                    <CardImg src="/images/reactjs.jpg" variant="top"
                      style={{ width: "100%", height: 160 }} />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}>
                        {c.description}
                      </CardText>

                      {enrolled && (
                        <Button variant="primary" className="me-1">Go</Button>
                      )}

                      {/* Enroll / Unenroll buttons visible when showing all courses */}
                      {showAllCourses && currentUser && (
                        enrolled ? (
                          <button
                            className="btn btn-danger float-end"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(unenroll({ userId: currentUser._id, courseId: c._id }));
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success float-end"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(enroll({ userId: currentUser._id, courseId: c._id }));
                            }}
                          >
                            Enroll
                          </button>
                        )
                      )}

                      {/* Faculty Edit/Delete buttons */}
                      {currentUser?.role === "FACULTY" && (
                        <>
                          <button
                            onClick={(e) => { e.preventDefault(); setCourse(c); }}
                            className="btn btn-warning me-2 float-end"
                            id="wd-edit-course-click"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => { e.preventDefault(); dispatch(deleteCourse(c._id)); }}
                            className="btn btn-danger float-end me-2"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}