import { FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <FaCheckCircle className="text-success me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}