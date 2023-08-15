"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log("response", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed", error.message);
      toast.error(error.message);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
      console.log("runned useeffect and set the button value true");
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center space-y-3  pt-64 justify-center">
        <h1 className="text-2xl">{loading ? "Loading" : "Signup"}</h1>
        <div className="space-x-2">
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
            className="py-1 pl-2 rounded-md text-black"
          />
        </div>

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
          onClick={handleSignup}
        >
          {buttonDisabled ? "No signup" : "signup"}
        </button>
        <div className="flex gap-3">
          <p>Already have an account ? </p>
          <span>
            <Link href="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
