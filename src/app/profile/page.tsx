"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import axios from "axios";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [isEditAddress, setIsEditAddress] = useState(false);

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
        className="flex flex-col items-start gap-4 text-[18px]"
      >
        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            <IoLocationSharp />
            <h6>Address</h6>
          </div>
          <button
            type="button"
            className="flex gap-2 items-center hover:text-primary"
            onClick={() => setIsEditAddress((prev) => !prev)}
          >
            <MdEditSquare />
            <h6>{isEditAddress ? "Cancel" : "Edit"}</h6>
          </button>
        </div>
        {isEditAddress ? (
          <div className="w-full flex rounded-lg overflow-hidden">
            <input
              className="bg-gray-300 p-3 w-full"
              placeholder="Please enter your current address"
              type="text"
              value={user?.address || ""}
              onChange={(e) =>
                setUser((prev) =>
                  prev ? { ...prev, address: e.target.value } : prev
                )
              }
            />
            <button className="flex items-center gap-1 bg-primary p-3 text-white hover:bg-primary-hover">
              <FaSave /> Save
            </button>
          </div>
        ) : (
          <p className={user?.address === "" ? "text-red-600" : ""}>
            {user?.address || "You haven't selected an address yet"}
          </p>
        )}
      </form>
      {/* Seccion de cerrar sesion */}
      <button className="w-full flex gap-2 items-center justify-center bg-primary px-6 py-3 rounded-2xl text-white hover:bg-primary-hover">
        <FaSignOutAlt /> Sign Out
      </button>
    </main>
  );
}
