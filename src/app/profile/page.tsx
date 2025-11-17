"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Address from "./components/Address";

export default function Profile() {
  const [isAddAddress, setIsAddAddress] = useState(false);
  const { user } = useAuth();

  return (
    <main className="flex flex-col gap-10 justify-center text-start">
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
      <section className="flex flex-col items-start gap-6 text-[18px]">
        <header className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            <IoLocationSharp />
            <h6>Addresses</h6>
          </div>
          <button
            type="button"
            className="flex gap-2 items-center hover:text-primary"
            onClick={() => setIsAddAddress((prev) => !prev)}
          >
            <FaPlusCircle />
            <h6>{isAddAddress ? "Cancel" : "Add Address"}</h6>
          </button>
        </header>
        {isAddAddress && <Address />}
        {user?.addresses.map((item, index) => (
          <Address key={index} id={user.addresses[index].id} address={item} />
        ))}
      </section>
      {/* Seccion de cerrar sesion */}
      <button className="w-full flex gap-2 items-center justify-center bg-primary px-6 py-3 rounded-2xl text-white hover:bg-primary-hover">
        <FaSignOutAlt /> Sign Out
      </button>
    </main>
  );
}
