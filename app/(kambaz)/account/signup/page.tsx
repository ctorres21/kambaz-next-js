"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { FormControl, Button } from "react-bootstrap";
import Link from "next/link";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <FormControl value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2" placeholder="username" />
      <FormControl value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2" placeholder="password" type="password" />
      <Button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100">Sign up</Button>
      <br />
      <Link href="/account/signin" className="wd-signin-link">Sign in</Link>
    </div>
  );
}