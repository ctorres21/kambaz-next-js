import { ReactNode } from "react";
import AccountNavigation from "./Navigation";
export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz" className="container-fluid">
      <div className="row">
        <div className="col-3 col-md-2 col-lg-2 p-0">
          <AccountNavigation />
        </div>
        <div className="col p-0">{children}</div>
      </div>
    </div>
  );
}
