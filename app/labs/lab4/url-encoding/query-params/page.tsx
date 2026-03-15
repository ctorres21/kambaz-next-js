"use client";
import { useSearchParams } from "next/navigation";
export default function QueryCalculator() {
  const searchParams = useSearchParams();
  const aRaw = searchParams.get("a") || "0";
  const bRaw = searchParams.get("b") || "0";
  const sum = parseFloat(aRaw) + parseFloat(bRaw);
  return (
    <div style={{ padding: 40 }}>
      <h1>Calculator – Query Parameters</h1>
      <p>a = <code>{aRaw}</code></p>
      <p>b = <code>{bRaw}</code></p>
      <h2 style={{ color: "green" }}>Sum = {sum}</h2>
    </div>
  );
}
