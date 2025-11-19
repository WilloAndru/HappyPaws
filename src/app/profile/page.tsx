"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Address from "./components/Address";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import axios from "axios";

export default function Profile() {
  const [isAddAddress, setIsAddAddress] = useState(false);
  const { user, setUser, logout } = useAuth();
  const [isEditCellphone, setIsEditCellphone] = useState(false);
  const [cellphone, setCellphone] = useState(user?.cellphone);
  const [changePhone, setChangePhone] = useState(false);

  // Funcion para actualizar telefono
  const handleSaveCellphone = async () => {
    try {
      const res = await axios.patch(`/api/users/`, {
        userId: user?.id,
        cellphone: cellphone,
      });
      if (res.status === 200) {
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            cellphone: cellphone || null,
          };
        });
        window.location.reload();
      }
      setIsEditCellphone(false);
    } catch (error) {
      console.error("Error updating cellphone:", error);
    }
  };

  return (
    <main className="flex flex-col gap-10 justify-center text-start">
      {/* Secion de bienvenida */}
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
      {/* Seccion de telefono */}
      <section className="flex flex-col gap-4 w-full">
        {/* Header */}
        <header className="flex justify-between items-center w-full">
          {/* Titulo */}
          <div className="flex gap-2 items-center">
            <FaPhoneAlt />
            <h5>Cellphone</h5>
          </div>
          {/* Botones */}
          <div className="flex gap-4 text-[18px]">
            {/* Boton de guardar */}
            {isEditCellphone && changePhone && (
              <button
                className="flex gap-2 items-center hover:text-primary"
                onClick={handleSaveCellphone}
              >
                <FaSave />
                <h6>Save</h6>
              </button>
            )}
            {/* Boton de editar */}
            <button
              className="flex gap-2 items-center hover:text-primary"
              onClick={() => setIsEditCellphone((prev) => !prev)}
            >
              <MdEditSquare />
              <h6>{isEditCellphone ? "Cancel" : "Edit"}</h6>
            </button>
          </div>
        </header>
        {/* Telefono */}
        {isEditCellphone ? (
          <input
            type="text"
            value={cellphone || ""}
            onChange={(e) => {
              setChangePhone(true);
              setCellphone(e.target.value);
            }}
            className="rounded-[6px] px-2 py-1 bg-gray-200 max-w-[100px] md:max-w-none font-bold"
            placeholder="Enter your phone"
          />
        ) : (
          <h6>{user?.cellphone || "Phone empty"}</h6>
        )}
      </section>
      {/* Seccion de cerrar sesion */}
      <button
        onClick={logout}
        className="w-full flex gap-2 items-center justify-center bg-primary px-6 py-3 rounded-2xl text-white hover:bg-primary-hover"
      >
        <FaSignOutAlt /> Sign Out
      </button>
    </main>
  );
}
