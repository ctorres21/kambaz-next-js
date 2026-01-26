import Link from "next/link";

export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;

  return (
    <div id="wd-assignments">
      <input
        placeholder="Search for Assignments"
        id="wd-search-assignment"
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/123`}
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/124`}
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/125`}
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </Link>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/126`}
            className="wd-assignment-link"
          >
            A4 - STATE + ROUTING
          </Link>
        </li>
      </ul>
    </div>
  );
}
