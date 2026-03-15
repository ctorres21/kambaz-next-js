import { FaTrash } from "react-icons/fa";
import { FaPencil, FaCheckCircle } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
  moduleId: string; deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" style={{ cursor: "pointer" }} />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} style={{ cursor: "pointer" }} />
      <FaCheckCircle className="text-success me-2" />
      <BsPlus className="fs-1" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
