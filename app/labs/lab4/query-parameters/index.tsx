"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function UrlEncoding() {
  const [a, setA] = useState("5");
  const [b, setB] = useState("10");
  const router = useRouter();
  const baseUrl = "/labs/lab4/url-encoding";
  const goToQueryVersion = () => {
    const params = new URLSearchParams(); params.set("a", a); params.set("b", b);
    router.push(`${baseUrl}/query-params?${params.toString()}`);
  };
  const goToPathVersion = () => {
    router.push(`${baseUrl}/path-params/${encodeURIComponent(a)}/${encodeURIComponent(b)}`);
  };
  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h2>Addition Calculator</h2>
      <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="form-control mb-2" />
      <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="form-control mb-2" />
      <h4>Programmatic navigation:</h4>
      <button onClick={goToQueryVersion} className="btn btn-success w-100 mb-2">{a} + {b} → Query Params</button>
      <button onClick={goToPathVersion} className="btn btn-success w-100 mb-2">{a} + {b} → Path Params</button>
      <h4>Declarative navigation:</h4>
      <Link href={`${baseUrl}/query-params?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`} className="btn btn-primary w-100 mb-2">
        {a} + {b} → Query Params (Link)</Link>
      <Link href={`${baseUrl}/path-params/${encodeURIComponent(a)}/${encodeURIComponent(b)}`} className="btn btn-primary w-100">
        {a} + {b} → Path Params (Link)</Link>
    </div>
  );
}
