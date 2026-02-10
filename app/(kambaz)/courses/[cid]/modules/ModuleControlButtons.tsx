import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <FaPlus className="ms-2" />
      <BsPlus className="ms-2 me-2 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
