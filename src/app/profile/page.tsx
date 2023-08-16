"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
export default function ProfilePage() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState("nothing");

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleUserDetails = async () => {
    const userData = await axios.get("api/user/me");
    console.log(userData.data.data);
    setUserInfo(userData.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <h1>Profile</h1>
      <hr />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
      focus:border-gray-600 mt-6"
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
      focus:border-gray-600 mt-6"
        onClick={handleUserDetails}
      >
        Get User Data
      </button>
      {/* <h1>
        {userInfo === "nothing" ? (
          "click above"
        ) : (
          <Link href={`/profile/${userInfo}`}>{userInfo}</Link>
        )}
      </h1> */}
      <h2 className="p-1 rounded bg-green-500">
        {userInfo === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${userInfo}`}>{userInfo}</Link>
        )}
      </h2>
    </div>
  );
}
