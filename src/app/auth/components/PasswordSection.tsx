"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { auth } from "@/app/firebase/config";

type PasswordSectionProps = {
  isNew: boolean;
  email: string;
  setStateAuth: React.Dispatch<React.SetStateAction<number>>;
};

export default function PasswordSection({
  isNew,
  email,
  setStateAuth,
}: PasswordSectionProps) {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isNew) {
        // Crear nueva cuenta
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        // Iniciar sesión existente
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      const token = await userCredential.user.getIdToken();
      await axios.post("/api/users", { token });
      router.push("/");
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/invalid-credential") {
        alert("Invalid credentials. Please check your password.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Titulo */}
      <h2>{isNew ? "Create Account" : "Sign in"}</h2>
      {/* Description */}
      <p className="mt-[-16px] mb-[-4px]">
        {isNew ? (
          <>
            Set a password for <strong>{email}</strong>
          </>
        ) : (
          <>
            Welcome back <strong>{email}</strong>!
          </>
        )}
      </p>
      {/* Input de contraseña */}
      <div className="flex flex-col gap-2">
        <h6>Password</h6>
        <input
          className="bg-white rounded-xl px-4 py-2 border-2 border-gray-400 focus:border-primary"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* Boton de continuar */}
      <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-full text-white">
        Next
      </button>
      {/* Boton de cancelar */}
      <button
        onClick={() => setStateAuth(0)}
        className="bg-white hover:bg-gray-300 px-4 py-2 rounded-full text-black"
      >
        Cancel
      </button>
    </form>
  );
}
