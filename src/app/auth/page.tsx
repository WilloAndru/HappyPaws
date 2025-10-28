"use client";
import Link from "next/link";
import React, { useState } from "react";
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
import { syncUser } from "@/hooks/useUsers";

export default function Auth() {
  // 0: Estado ingresa el email, 1: Estado ingresa contraseña para login, 2: Estado ingresa contraseña para registro
  const [stateAuth, setStateAuth] = useState(0);
  const [email, setEmail] = useState("");

  // Login con google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      const syncedUser = await syncUser({
        email: result.user.email!,
        name: result.user.displayName,
        image: result.user.photoURL,
        firebaseUid: result.user.uid,
      });
      console.log(syncedUser);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Login con github
  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        {stateAuth === 0 && <EmailSection email={email} setEmail={setEmail} />}
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
          onClick={handleGoogleLogin}
          className="px-4 py-2 rounded-full bg-white flex items-center gap-2 justify-center border-2 border-gray-300 hover:bg-gray-300"
        >
          <FcGoogle />
          Continue with Google
        </button>
        <button
          onClick={handleGitHubLogin}
          className="px-4 py-2 rounded-full bg-white flex items-center gap-2 justify-center border-2 border-gray-300 hover:bg-gray-300"
        >
          <FaGithub />
          Continue with GitHub
        </button>
      </section>
    </main>
  );
}
