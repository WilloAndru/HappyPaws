"use client";

import React, { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

type AddressProps = {
  id?: string;
  address?: any;
};

export default function Address({ id, address }: AddressProps) {
  const { user, setUser } = useAuth();
  const [isEdit, setIsEdit] = useState(!id ? true : false);
  const [values, setValues] = useState({
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    country: address?.country || "",
  });
  // Comprobamos que tenga toda la informacion, si no mandamos un aviso
  const [isFull, setIsFull] = useState(false);

  // Comprobamos que los datos sean llenados
  useEffect(() => {
    if (
      values.name !== "" &&
      values.address !== "" &&
      values.city !== "" &&
      values.country !== ""
    ) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [values]);

  // Guardamos los datos de la nueva direccion en la db
  const handleSave = async () => {
    try {
      const res = await axios.post(`/api/address/`, {
        userId: user?.id,
        idAddress: id ? id : "",
        name: values.name,
        address: values.address,
        city: values.city,
        country: values.country,
      });
      // Si la respuesta es 200 actualizamos direccion
      if (res.data.status === 200) {
        const updatedAddress = res.data;
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            addresses: prev.addresses.map((a) =>
              a.id === updatedAddress.id ? updatedAddress : a
            ),
          };
        });
      }
      // Si la respuesta es 201 creamos nueva direccion
      else if (res.data.status === 201) {
        const createdAddress = res.data.created;
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            addresses: [...prev.addresses, createdAddress],
          };
        });
      }
      window.location.reload();
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 px-4 py-3 border-1 rounded-2xl border-gray-500">
      {/* Header */}
      <header className="flex justify-between">
        {/* Seccion del nombre de la direccion a la izquierda */}
        {isEdit ? (
          <div className="flex gap-4 items-center">
            <input
              className="rounded-[6px] px-2 bg-gray-200 max-w-[100px] md:max-w-none font-bold"
              placeholder="Enter the name address"
              value={values.name}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
            />
            {!isFull && (
              <span className="text-[16px] text-red-500">
                Please fill in the address details
              </span>
            )}
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <h6>{address?.name || "New address"}</h6>
            {!isFull && (
              <span className="text-[16px] text-red-500">
                Please fill in the address details
              </span>
            )}
          </div>
        )}
        {/* Seccion de botones a la derecha */}
        <div className="flex gap-4">
          {isEdit && isFull && (
            <button
              className="flex gap-2 items-center hover:text-primary"
              onClick={handleSave}
            >
              <FaSave />
              <h6>Save</h6>
            </button>
          )}
          {id && (
            <button
              type="button"
              className="flex gap-2 items-center hover:text-primary"
              onClick={() => setIsEdit((prev) => !prev)}
            >
              <MdEditSquare />
              <h6>{isEdit ? "Cancel" : "Edit"}</h6>
            </button>
          )}
        </div>
      </header>
      {/* Seccion de datos */}
      <div className="flex flex-col gap-4 text-[16px]">
        {/* Pais */}
        <div className="flex flex-col gap-1">
          <h6>Country</h6>
          {isEdit ? (
            <input
              className="rounded-[6px] px-2 bg-gray-200"
              placeholder="Enter your country"
              value={values.country}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, country: e.target.value }))
              }
              type="text"
            />
          ) : (
            <p>{address?.country}</p>
          )}
        </div>
        {/* Ciudad */}
        <div className="flex flex-col gap-1">
          <h6>City</h6>
          {isEdit ? (
            <input
              className="rounded-[6px] px-2 bg-gray-200"
              placeholder="Enter your city"
              value={values.city}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, city: e.target.value }))
              }
              type="text"
            />
          ) : (
            <p>{address?.city}</p>
          )}
        </div>
        {/* Direccion */}
        <div className="flex flex-col gap-1">
          <h6>Address</h6>
          {isEdit ? (
            <input
              className="rounded-[6px] px-2 bg-gray-200"
              placeholder="Enter your address"
              value={values.address}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, address: e.target.value }))
              }
              type="text"
            />
          ) : (
            <p>{address?.address}</p>
          )}
        </div>
      </div>
    </div>
  );
}
