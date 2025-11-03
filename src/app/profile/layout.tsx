"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import { FaUser, FaRegCreditCard, FaSignOutAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const linkClass =
    "flex text-gray-800 p-4 items-center gap-2 font-bold hover:bg-blue-200 rounded-xl";

  return (
    <main className="rounded-xl bg-gray-100 flex">
      <nav className="flex flex-col p-2 border-r-4 border-gray-300">
        <Link href="/profile" className={linkClass}>
          <FaUser /> <span>Profile</span>
        </Link>

        <Link href="/profile/adresses" className={linkClass}>
          <FaLocationDot /> <span>Addresses</span>
        </Link>

        <Link href="/profile/paymentMethods" className={linkClass}>
          <FaRegCreditCard /> <span>Payment Methods</span>
        </Link>

        <Link href="/profile/settings" className={linkClass}>
          <IoMdSettings /> <span>Settings</span>
        </Link>

        <button onClick={logout} className={linkClass}>
          <FaSignOutAlt /> <span>Sign Out</span>
        </button>
      </nav>
      <section>{children}</section>
    </main>
  );
}
