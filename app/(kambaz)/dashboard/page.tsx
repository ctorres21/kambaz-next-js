"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setCourses } from "../courses/reducer";
import * as courseClient from "../courses/client";
import {
  Row, Col, Card, CardImg, CardBody, CardTitle, CardText,
  Button, FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    description: "New Description",
  });
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

  const fetchCourses = async () => {
    try {
      const myCourses = await courseClient.findMyCourses();
      dispatch(setCourses(myCourses));
      setEnrolledIds(myCourses.map((c: any) => c._id));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAllCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      dispatch(setCourses(allCourses));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  useEffect(() => {
    if (showAllCourses) {
      fetchAllCourses();
    } else {
      fetchCourses();
    }
  }, [showAllCourses]);

  const onAddNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };
  const onDeleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await courseClient.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => (c._id === course._id ? course : c))));
  };
  const onEnroll = async (courseId: string) => {
    await courseClient.enrollInCourse(courseId);
    setEnrolledIds([...enrolledIds, courseId]);
  };
  const onUnenroll = async (courseId: string) => {
    await courseClient.unenrollFromCourse(courseId);
    setEnrolledIds(enrolledIds.filter((id) => id !== courseId));
  };

  const isEnrolled = (courseId: string) => enrolledIds.includes(courseId);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button className="btn btn-primary float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}>
          {showAllCourses ? "My Courses" : "Enrollments"}
        </button>
      </h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button className="btn btn-primary float-end" id="wd-add-new-course-click"
              onClick={onAddNewCourse}>Add</button>
            <button className="btn btn-warning float-end me-2" id="wd-update-course-click"
              onClick={onUpdateCourse}>Update</button>
          </h5>
          <br />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c: any) => {
            const enrolled = isEnrolled(c._id);
            return (
              <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={enrolled || !showAllCourses ? `/courses/${c._id}/home` : "#"}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (showAllCourses && !enrolled) {
                        e.preventDefault();
                      }
                    }}>
                    <CardImg src="/images/reactjs.jpg" variant="top"
                      style={{ width: "100%", height: 160 }} />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}>{c.description}</CardText>
                      {(!showAllCourses || enrolled) && (
                        <Button variant="primary" className="me-1">Go</Button>
                      )}
                      {showAllCourses && currentUser && (
                        enrolled ? (
                          <button className="btn btn-danger float-end"
                            onClick={(e) => { e.preventDefault(); onUnenroll(c._id); }}>
                            Unenroll
                          </button>
                        ) : (
                          <button className="btn btn-success float-end"
                            onClick={(e) => { e.preventDefault(); onEnroll(c._id); }}>
                            Enroll
                          </button>
                        )
                      )}
                      {currentUser?.role === "FACULTY" && (
                        <>
                          <button onClick={(e) => { e.preventDefault(); setCourse(c); }}
                            className="btn btn-warning me-2 float-end" id="wd-edit-course-click">Edit</button>
                          <button onClick={(e) => { e.preventDefault(); onDeleteCourse(c._id); }}
                            className="btn btn-danger float-end me-2" id="wd-delete-course-click">Delete</button>
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