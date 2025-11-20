import React from "react";

function page() {
  return (
    <div class="p-10 w-[85%] mx-auto flex flex-col justify-center">
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Sign up</h2>
      <p className="mb-2 text-gray-600">Create and account and start getting help from professionals</p>

      <form action="/auth/login" method="POST" class="space-y-5">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            class="w-full px-4 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            class="w-full px-4 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            class="w-full px-4 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 rounded-full bg-orange text-white cursor-pointer font-medium hover:bg-orange/50 transition"
        >
          Login
        </button>
      </form>

      <div class="text-sm text-gray-500 mt-8 flex justify-between">
        <span>
          Have an account?{" "}
          <a href="/login" class="text-orange-700 underline">
            Login
          </a>
        </span>
      </div>
    </div>
  );
}

export default page;
