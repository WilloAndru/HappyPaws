"use client";

import { useAuth } from "@/context/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";

export default function Profile() {
  const { user } = useAuth();

  return (
    <main className="flex items-center justify-center text-center p-4">
      <h2>Hello! {user?.displayName}</h2>
    </main>
  );
}
