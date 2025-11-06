"use client";

import { useAuth } from "@/context/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import React from "react";

export default function Profile() {
  const { user } = useAuth();

  return (
    <main className="flex items-center justify-center text-center">
      <section>
        <Image
          src={(user?.photoURL as string) ?? "/pets/cat.png"}
          alt="Avatar"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <h2>Hello! {user?.displayName}</h2>
      </section>
    </main>
  );
}
