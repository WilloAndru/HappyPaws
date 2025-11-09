"use client";

import { auth } from "@/app/firebase/config";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import React from "react";

type EmailSectionProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setStateAuth: React.Dispatch<React.SetStateAction<number>>;
};

export default function EmailSection({
  email,
  setEmail,
  setStateAuth,
}: EmailSectionProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanEmail = email.trim().toLowerCase();
      console.log("Checking clean email:", JSON.stringify(cleanEmail));
      const methods = await fetchSignInMethodsForEmail(auth, cleanEmail);
      console.log("Fetched methods:", methods);

      // Si no esta registrado
      if (methods.length === 0) {
        setStateAuth(2);
      }
      // Si ya esta registrado
      else if (methods.includes("password")) {
        setStateAuth(1);
        console.log(2);
      } else {
        alert(
          "This email is already associated with a Google or GitHub account."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Was a problem checking the email");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Titulo */}
      <h2>Sign in or create account</h2>
      {/* Input de email */}
      <div className="flex flex-col gap-2">
        <h6>Email</h6>
        <input
          className="bg-white rounded-xl px-4 py-2 border-2 border-gray-400 focus:border-primary"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {/* Boton de continuar */}
      <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-full text-white">
        Continue
      </button>
    </form>
  );
}
