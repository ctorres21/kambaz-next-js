"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["profile"] : ["signin", "signup"];
  const pathname = usePathname();
  return (
    <Nav variant="pills" className="mb-3">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink as={Link} href={`/account/${link}`} active={pathname.includes(link)}>
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}

