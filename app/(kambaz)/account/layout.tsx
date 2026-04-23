import { ReactNode } from "react";
import AccountNavigation from "./Navigation";
export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-account-screen">
      <h2>Account</h2>
      <div className="d-flex">
        <div className="me-3"><AccountNavigation /></div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
