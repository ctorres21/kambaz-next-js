"use client";
import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  const courses = [
    {
      id: "1234",
      title: "CS1234 React JS",
      description: "Full Stack software developer",
      image: "/images/reactjs.jpg",
    },
    {
      id: "4700",
      title: "CS4700 Network Fundamentals",
      description: "Networks",
      image: "/images/networks.jpg",
    },
    {
      id: "4530",
      title: "CS4530 Fundamentals of Software Engineering",
      description: "Software Engineer",
      image: "/images/software.jpg",
    },
    {
      id: "4550",
      title: "CS4550 Web Development",
      description: "Web developer",
      image: "/images/html.jpg",
    },
    {
      id: "3386",
      title: "CS3386 Game Programming II",
      description: "Game development",
      image: "/images/game.jpg",
    },
    {
      id: "1205",
      title: "MUSC1205 Piano Class 1",
      description: "Pianist",
      image: "/images/piano.jpg",
    },
    {
      id: "1501",
      title: "PORT1501 Accelerated Elementary Portuguese 1",
      description: "Portuguese language",
      image: "/images/portugal.jpg",
    },
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row className="g-4">
          {courses.map((course) => (
            <Col
              key={course.id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card className="h-100">
                <Link
                  href={`/courses/${course.id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={course.image}
                    style={{ width: "100%", height: "160px", objectFit: "cover" }}
                    alt={course.title}
                  />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.title}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
