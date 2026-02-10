"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
export default function AccountNavigation() {
  const pathname = usePathname();
  const active = (path: string) => (pathname === path ? "active" : "");
  return (
    <ListGroup id="wd-account-navigation" className="rounded-0 fs-5">
      <ListGroupItem className={active("/account/signin")}>
        <Link
          href="/account/signin"
          className={`text-decoration-none ${pathname === "/account/signin" ? "text-white" : ""}`}
        >
          Signin
        </Link>
      </ListGroupItem>
      <ListGroupItem className={active("/account/signup")}>
        <Link
          href="/account/signup"
          className={`text-decoration-none ${pathname === "/account/signup" ? "text-white" : ""}`}
        >
          Signup
        </Link>
      </ListGroupItem>
      <ListGroupItem className={active("/account/profile")}>
        <Link
          href="/account/profile"
          className={`text-decoration-none ${pathname === "/account/profile" ? "text-white" : ""}`}
        >
          Profile
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
