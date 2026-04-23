import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#c5203e", textAlign: "center", marginBottom: 10 }}>Kambaz</h1>
      <h3 style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
        Learning Management System
      </h3>
      <hr />
      <p style={{ textAlign: "center", fontSize: "1.1em", lineHeight: 1.8 }}>
        Kambaz is a full-stack Learning Management System built with Next.js, React, Redux,
        Node.js, and Express. It supports course management, module creation, assignments,
        and a comprehensive quizzes system with multiple question types, grading, and
        multi-attempt support.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 30, flexWrap: "wrap" }}>
        <Link href="/dashboard"
          style={{
            padding: "12px 32px", backgroundColor: "#c5203e", color: "white",
            borderRadius: 6, textDecoration: "none", fontSize: "1.1em", fontWeight: "bold",
          }}>
          Go to Dashboard
        </Link>
        <Link href="/account/signin"
          style={{
            padding: "12px 32px", backgroundColor: "#333", color: "white",
            borderRadius: 6, textDecoration: "none", fontSize: "1.1em", fontWeight: "bold",
          }}>
          Sign In
        </Link>
      </div>
      <div style={{
        marginTop: 40, padding: 30, backgroundColor: "#f8f9fa",
        borderRadius: 8, border: "1px solid #dee2e6",
      }}>
        <h4 style={{ marginBottom: 15 }}>Project Information</h4>
        <p><strong>Team Members:</strong></p>
        <ul>
          <li>Corina Torres — Section 1</li>
        </ul>
        <p><strong>GitHub Repositories:</strong></p>
        <ul>
          <li>
            <a href="https://github.com/ctorres21/kambaz-next-js" target="_blank" rel="noopener noreferrer">
              Frontend (Next.js) Repository
            </a>
          </li>
          <li>
            <a href="https://github.com/ctorres21/kambaz-node-server-app" target="_blank" rel="noopener noreferrer">
              Server (Node.js) Repository
            </a>
          </li>
        </ul>
        <p><strong>Test Accounts:</strong></p>
        <ul>
          <li><strong>Faculty:</strong> username: <code>iron_man</code> / password: <code>stark123</code></li>
          <li><strong>Student:</strong> username: <code>dark_knight</code> / password: <code>wayne234</code></li>
        </ul>
      </div>
    </div>
  );
}
