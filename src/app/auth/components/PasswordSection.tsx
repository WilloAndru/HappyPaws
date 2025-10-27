import React, { useState } from "react";

type PasswordSectionProps = {
  isNew: boolean;
  email: string;
};

export default function PasswordSection({
  isNew,
  email,
}: PasswordSectionProps) {
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Titulo */}
      <h2>{isNew ? "Create Account" : "Sign in"}</h2>
      {/* Description */}
      <p className="mt-[-16px] mb-[-4px]">
        {isNew ? (
          <>
            Set a password for <strong>{email}</strong>
          </>
        ) : (
          <>
            Welcome back <strong>{email}</strong>!
          </>
        )}
      </p>
      {/* Input de contraseña */}
      <div className="flex flex-col gap-2">
        <h6>Password</h6>
        <input
          className="bg-white rounded-xl px-4 py-2 border-2 border-gray-400 focus:border-primary"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* Boton de continuar */}
      <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-full text-white">
        Next
      </button>
      {/* Boton de cancelar */}
      <button className="bg-white hover:bg-gray-300 px-4 py-2 rounded-full text-black">
        Cancel
      </button>
    </form>
  );
}
