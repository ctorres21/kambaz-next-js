"use client";
import { useParams } from "next/navigation";
export default function PathCalculator() {
  const params = useParams();
  const aRaw = params.a as string; const bRaw = params.b as string;
  const sum = parseFloat(aRaw) + parseFloat(bRaw);
  return (
    <div style={{ padding: 40 }}>
      <h1>Calculator – Path Parameters</h1>
      <p>a = <code>{aRaw}</code></p>
      <p>b = <code>{bRaw}</code></p>
      <h2 style={{ color: "green" }}>Sum = {sum}</h2>
    </div>
  );
}