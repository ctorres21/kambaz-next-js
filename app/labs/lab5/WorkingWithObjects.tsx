"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [moduleName, setModuleName] = useState("Introduction to Node");
  const [moduleDescription, setModuleDescription] = useState("Learn Node.js basics");
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}`}>Get Assignment</a>
      <a id="wd-retrieve-modules" className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}>Get Module</a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}/title`}>Get Title</a>
      <a id="wd-retrieve-module-name" className="btn btn-primary me-2"
        href={`${MODULE_API_URL}/name`}>Get Module Name</a>
      <hr />
      <h4>Modifying Properties</h4>
      <label className="form-label"><b>Assignment Title</b></label>
      <FormControl className="w-75 mb-2" id="wd-assignment-title" defaultValue={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
      <a id="wd-update-assignment-title" className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>Update Title</a>
      <hr />
      <label className="form-label"><b>Assignment Score</b></label>
      <FormControl className="w-75 mb-2" type="number" defaultValue={assignment.score}
        onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })} />
      <a className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>Update Score</a>
      <hr />
      <label className="form-label"><b>Assignment Completed</b></label>
      <input type="checkbox" className="form-check-input ms-2" defaultChecked={assignment.completed}
        onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} />
      <br />
      <a className="btn btn-primary me-2 mt-2"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>Update Completed</a>
      <hr />
      <label className="form-label"><b>Module Name</b></label>
      <FormControl className="w-75 mb-2" defaultValue={moduleName}
        onChange={(e) => setModuleName(e.target.value)} />
      <a className="btn btn-primary me-2"
        href={`${MODULE_API_URL}/name/${moduleName}`}>Update Module Name</a>
      <hr />
      <label className="form-label"><b>Module Description</b></label>
      <FormControl className="w-75 mb-2" defaultValue={moduleDescription}
        onChange={(e) => setModuleDescription(e.target.value)} />
      <a className="btn btn-primary me-2"
        href={`${MODULE_API_URL}/description/${moduleDescription}`}>Update Module Description</a>
      <hr />
    </div>
  );
}