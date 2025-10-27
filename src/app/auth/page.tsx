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

export default function Auth() {
  // Login con google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
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

  // Funcion si se desea iniciar secion con el email
  const handleSubmit = async () => {};

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-12 rounded-2xl shadow-lg border border-gray-300 w-[350px] md:min-w-[450px]"
      >
        {/* Titulo */}
        <h2>Sign in or create account</h2>
        {/* Input de email */}
        <div className="flex flex-col gap-2">
          <h6>Email</h6>
          <input
            className="bg-white rounded-xl px-4 py-2 border-2 border-gray-400 focus:border-primary"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        {/* Boton de continuar */}
        <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-full text-white">
          Continue
        </button>
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
          type="button"
        >
          <FcGoogle />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={handleGitHubLogin}
          className="px-4 py-2 rounded-full bg-white flex items-center gap-2 justify-center border-2 border-gray-300 hover:bg-gray-300"
        >
          <FaGithub />
          Continue with GitHub
        </button>
      </form>
    </main>
  );
}
