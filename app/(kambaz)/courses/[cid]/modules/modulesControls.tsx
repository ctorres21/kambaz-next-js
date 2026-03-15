"use client";
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import ModuleEditor from "./ModuleEditor";
export default function ModulesControls(
  { moduleName, setModuleName, addModule }: {
    moduleName: string; setModuleName: (title: string) => void; addModule: () => void;
  }
) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" className="me-1 float-end" onClick={handleShow}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />Module
      </Button>
      <Dropdown className="float-end me-1">
        <Dropdown.Toggle variant="secondary"><FaCheckCircle className="me-1" style={{ color: "green" }} />Publish All</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Publish All</Dropdown.Item>
          <Dropdown.Item>Unpublish All</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="secondary" className="me-1 float-end">View Progress</Button>
      <Button variant="secondary" className="me-1 float-end">Collapse All</Button>
      <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
        moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
    </div>
  );
}
