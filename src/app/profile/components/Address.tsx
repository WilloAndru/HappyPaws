import React, { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { FaSave } from "react-icons/fa";

type AddressProps = {
  address: any;
};

export default function Address({ address }: AddressProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState({
    name: address.name,
    address: address.address,
    city: address.city,
    country: address.country,
  });
  const isFull =
    address.address && address.city && address.country ? true : false;

  const handleSave = async () => {};

  return (
    <div
      key={address.id}
      className="flex w-full flex-col gap-4 px-4 py-3 border-1 rounded-2xl border-gray-500"
    >
      <header className="flex justify-between">
        {isEdit ? (
          <input
            className="rounded-[6px] px-2 bg-gray-200 font-bold"
            placeholder="Enter the name address"
            value={values.name}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
            type="text"
          />
        ) : (
          <div className="flex gap-4 items-center">
            <h6>{address.name}</h6>
            {!isFull && (
              <span className="text-[16px] text-red-500">
                Please fill in the address details
              </span>
            )}{" "}
          </div>
        )}
        <div className="flex gap-4">
          {isEdit && (
            <button
              type="button"
              className="flex gap-2 items-center hover:text-primary"
              onClick={handleSave}
            >
              <FaSave />
              <h6>Save</h6>
            </button>
          )}
          <button
            type="button"
            className="flex gap-2 items-center hover:text-primary"
            onClick={() => setIsEdit((prev) => !prev)}
          >
            <MdEditSquare />
            <h6>{isEdit ? "Cancel" : "Edit"}</h6>
          </button>
        </div>
      </header>
      <section className="flex flex-col gap-4 text-[16px]">
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
            <p>{address.country}</p>
          )}
        </div>
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
            <p>{address.city}</p>
          )}
        </div>
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
            <p>{address.address}</p>
          )}
        </div>
      </section>
    </div>
  );
}
