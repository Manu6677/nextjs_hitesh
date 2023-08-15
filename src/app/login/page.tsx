"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const userData = await axios.post("/api/user/login", user);
      console.log("userdata", userData);

      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center space-y-3  pt-64 justify-center">
        <h1 className="text-2xl">{loading ? "loading" : "Login"}</h1>

        <div className="space-x-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            className="py-1 pl-2 rounded-md text-black"
          />
        </div>

        <div className="space-x-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            className="py-1 pl-2 rounded-md text-black"
          />
        </div>

        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="flex gap-3">
          <p>Do not have an account ? </p>
          <span>
            <Link href="/signup">Signup</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
