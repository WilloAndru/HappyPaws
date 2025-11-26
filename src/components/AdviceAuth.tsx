import Link from "next/link";
import React from "react";
import { FiAlertCircle } from "react-icons/fi";

type AdviceAuthProps = {
  setShowAdviceAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdviceAuth({ setShowAdviceAuth }: AdviceAuthProps) {
  return (
    <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl flex flex-col rounded-2xl px-14 py-7 items-center gap-6">
      <FiAlertCircle className="text-5xl text-red-500" />
      <h2>Before continuing, sign up or log in</h2>
      <div className="flex gap-4">
        <Link
          className="rounded-xl px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold"
          href="/auth"
        >
          Go to login
        </Link>
        <button
          className="rounded-xl px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white"
          onClick={() => setShowAdviceAuth(false)}
        >
          Continue browsing
        </button>
      </div>
    </main>
  );
}
