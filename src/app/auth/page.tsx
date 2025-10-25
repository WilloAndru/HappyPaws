import Link from "next/link";
import React from "react";
import { MdOutlinePets } from "react-icons/md";

export default function Auth() {
  return (
    <main className="flex flex-col gap-6 items-center justify-center w-screen h-screen bg-[url('/bgs/bgAuth.jpg')] bg-cover bg-center bg-no-repeat">
      <Link
        href="/"
        className="flex items-center gap-2 text-white text-4xl p-4 rounded-2xl bg-primary"
      >
        <MdOutlinePets />
        <h1>HappyPaws</h1>
      </Link>
      <form className="p-8 rounded-2xl shadow-lg border border-gray-300">
        <h2>Sign in or create account asdfadsfasdfadfasdfafdadfaf</h2>
        <input type="text" />
        <button>Continue</button>
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </form>
    </main>
  );
}
