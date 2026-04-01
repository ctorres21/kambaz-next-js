"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { FormControl, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign in failed");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <FormControl defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2" placeholder="username" id="wd-username" />
      <FormControl defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2" placeholder="password" type="password" id="wd-password" />
      <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">Sign in</Button>
      <Link id="wd-signup-link" href="/account/signup">Sign up</Link>
    </div>
  );
}