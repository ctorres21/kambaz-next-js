"use client";
import { usePathname } from "next/navigation";
export default function Breadcrumb({ course }: { course: { name: string } | undefined }) {
  const pathname = usePathname();
  return <span>{pathname.split("/").pop()}</span>;
}
