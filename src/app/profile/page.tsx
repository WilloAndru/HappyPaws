"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import Address from "./components/Address";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [isAddAddress, setIsAddAddress] = useState(false);

  const handleEditAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/users/${user?.id}`, {
        address: user?.address,
      });
      // Si la solicitud tiene exito actualizamos solo el address del user
      if (res.data.status === 200) {
        setUser((prev) => (prev ? { ...prev, address: user?.address } : prev));
      }
      setIsEditAddress(false);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  console.log(user);

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
      {/* Form de datos de domiciliio */}
      <form
        onSubmit={handleEditAddress}
        className="flex flex-col items-start gap-6 text-[18px]"
      >
        <div className="flex justify-between w-full">
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
        </div>
        {user?.addresses.map((item) => (
          <Address key={item.id} address={item} />
        ))}
      </form>
      {/* Seccion de cerrar sesion */}
      <button className="w-full flex gap-2 items-center justify-center bg-primary px-6 py-3 rounded-2xl text-white hover:bg-primary-hover">
        <FaSignOutAlt /> Sign Out
      </button>
    </main>
  );
}
