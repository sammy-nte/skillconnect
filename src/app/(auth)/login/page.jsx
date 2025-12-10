"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    const res = await fetch(
      "https://mod2-backend.onrender.com/api/auth/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    );

    const data = await res.json();
    if (res.ok && data.access) {
      sessionStorage.setItem("token", data.access);
      redirect("/dashboard");
    }
  };

  return (
    <div className="p-10 w-[85%] mx-auto flex flex-col justify-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Log into your account
      </h2>

      <form onSubmit={handleSubmit} method="POST" className="space-y-5">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full px-4 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full px-4 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-orange text-white cursor-pointer font-medium hover:bg-orange/50 transition"
        >
          Login
        </button>
      </form>

      <div className="text-sm text-gray-500 mt-8 flex justify-between">
        <span>
          Don&apos;t have any account?{" "}
          <a href="/signup" className="text-orange-700 underline">
            Sign Up
          </a>
        </span>
      </div>
    </div>
  );
}

export default Page;
