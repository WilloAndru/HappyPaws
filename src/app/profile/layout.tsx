"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { optionsUser } from "@/data/optionsUser";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Proteccion de ruta
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/auth");
    }
  }, [user, loading]);

  return (
    <main className="rounded-xl bg-gray-100 flex flex-col md:flex-row">
      <nav className="flex flex-col p-2 border-b-2 md:border-r-2 md:border-b-0 md:min-w-[25vw] border-gray-300">
        {optionsUser.map(({ label, href, icon: Icon }) => {
          const classes =
            "flex p-4 items-center gap-2 font-bold hover:bg-blue-200 rounded-xl";
          // Si el elemento es un link
          if (href) {
            return (
              <Link key={label} href={href} className={classes}>
                <Icon />
                {label}
              </Link>
            );
          }
          // Si el elemento es el boton de sign out
          return (
            <button key={label} onClick={() => logout()} className={classes}>
              <Icon />
              {label}
            </button>
          );
        })}
      </nav>
      <section className="py-[2vw] px-[4vw] w-full">{children}</section>
    </main>
  );
}
