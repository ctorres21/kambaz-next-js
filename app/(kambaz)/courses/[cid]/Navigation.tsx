"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <ListGroup id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 me-3"
      style={{ width: 150 }}>
      {links.map((link) => (
        <ListGroupItem key={link} as={Link}
          href={`/courses/${cid}/${link.toLowerCase()}`}
          className={`border-0 ${pathname.includes(link.toLowerCase()) ? "active text-black border-start border-3 border-dark" : "text-danger"}`}>
          {link}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}