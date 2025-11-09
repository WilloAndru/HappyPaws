"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import EmailSection from "./components/EmailSection";
import PasswordSection from "./components/PasswordSection";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Auth() {
  // 0: Estado ingresando con el email, 1: Estado ingresando la contraseña para login, 2: Estado ingresando contraseña para registro
  const [stateAuth, setStateAuth] = useState(0);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  // Login con google
  const handleSocialAuth = async (isGoogleProvider: boolean) => {
    try {
      const provider = isGoogleProvider
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Proteccion de ruta
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <main className="flex flex-col gap-6 items-center justify-center w-screen h-screen bg-[url('/bgs/bgAuth.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Boton de inicio */}
      <Link
        href="/"
        className="flex items-center gap-2 text-white text-4xl p-4 rounded-2xl bg-primary"
      >
        <MdOutlinePets />
        <h1>HappyPaws</h1>
      </Link>
      <section className="flex flex-col gap-6 p-8 rounded-2xl shadow-lg border border-gray-300 w-[350px] md:min-w-[450px]">
        {/* Seccion mutable dependiendo de si es login o register */}
        {stateAuth === 0 && (
          <EmailSection
            email={email}
            setEmail={setEmail}
            setStateAuth={setStateAuth}
          />
        )}
        {stateAuth === 1 && (
          <PasswordSection
            isNew={false}
            email={email}
            setStateAuth={setStateAuth}
          />
        )}
        {stateAuth === 2 && (
          <PasswordSection
            isNew={true}
            email={email}
            setStateAuth={setStateAuth}
          />
        )}
        {/* Separador del or */}
        <div className="flex items-center">
          <div className="flex-1 h-px bg-gray-500"></div>
          <span className="px-3 text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-500"></div>
        </div>
        {/* Botones de login con servicios */}
        <button
          onClick={() => handleSocialAuth(true)}
          className="px-4 py-2 rounded-full bg-white flex items-center gap-2 justify-center border-2 border-gray-300 hover:bg-gray-300"
        >
          <FcGoogle />
          Continue with Google
        </button>
        <button
          onClick={() => handleSocialAuth(false)}
          className="px-4 py-2 rounded-full bg-white flex items-center gap-2 justify-center border-2 border-gray-300 hover:bg-gray-300"
        >
          <FaGithub />
          Continue with GitHub
        </button>
      </section>
    </main>
  );
}
