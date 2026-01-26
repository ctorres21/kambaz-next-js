export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />

      <textarea id="wd-description" defaultValue={
`The assignment is available online.
Submit a link to the landing page of your Web application running on Netlify.
The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories`
      } />
      <br />
      <br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="ON_PAPER">On Paper</option>
              </select>

              <br />
              <br />

              <label htmlFor="wd-online-entry-options">Online Entry Options</label>
              <div id="wd-online-entry-options">
                <div>
                  <input type="checkbox" id="wd-text-entry" defaultChecked />
                  <label htmlFor="wd-text-entry">Text Entry</label>
                </div>
                <div>
                  <input type="checkbox" id="wd-website-url" defaultChecked />
                  <label htmlFor="wd-website-url">Website URL</label>
                </div>
                <div>
                  <input type="checkbox" id="wd-media-recordings" />
                  <label htmlFor="wd-media-recordings">Media Recordings</label>
                </div>
                <div>
                  <input type="checkbox" id="wd-student-annotation" />
                  <label htmlFor="wd-student-annotation">Student Annotation</label>
                </div>
                <div>
                  <input type="checkbox" id="wd-file-uploads" />
                  <label htmlFor="wd-file-uploads">File Uploads</label>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign to</label>
              <input id="wd-assign-to" defaultValue="Everyone" />
              <br />
              <br />

              <label htmlFor="wd-due-date">Due</label>
              <input id="wd-due-date" type="date" defaultValue="2026-05-13" />
              <br />
              <br />

              <label htmlFor="wd-available-from">Available from</label>
              <input id="wd-available-from" type="date" defaultValue="2026-05-06" />
              <br />
              <br />

              <label htmlFor="wd-available-until">Until</label>
              <input id="wd-available-until" type="date" defaultValue="2026-05-20" />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
