"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import Breadcrumb from "./Breadcrumb";
import { useEffect } from "react";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const course = courses.find((c: any) => c._id === cid);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
      return;
    }
  }, [currentUser, cid, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" style={{ cursor: "pointer" }}
          onClick={() => setShowNav(!showNav)} />
        {course?.name} &gt; <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {showNav && <div className="d-none d-md-block"><CourseNavigation /></div>}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}