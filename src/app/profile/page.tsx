"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React, { useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";

export default function Profile() {
  const { user } = useAuth();
  console.log(user);

  return (
    <main className="flex flex-col gap-8 justify-center text-center">
      {/* Secion de bienvienida */}
      <section className="flex gap-4 items-center w-full">
        <Image
          src={(user?.image as string) ?? "/pets/cat.png"}
          alt="Avatar"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <h2>Hello! {user?.name}</h2>
      </section>
      {/* Seccion de datos de domiciliio */}
      <section className="flex flex-col gap-4 text-[18px]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <IoLocationSharp />
            <h6>Address</h6>
          </div>
          <button className="flex gap-2 items-center">
            <MdEditSquare />
            <h6>Edit</h6>
          </button>
        </div>
        <h6>{user?.address}</h6>
      </section>
    </main>
  );
}
