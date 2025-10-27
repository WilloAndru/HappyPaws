import React from "react";

type EmailSectionProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export default function EmailSection({ email, setEmail }: EmailSectionProps) {
  const handleSubmit = async () => {};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Titulo */}
      <h2>Sign in or create account</h2>
      {/* Input de email */}
      <div className="flex flex-col gap-2">
        <h6>Email</h6>
        <input
          className="bg-white rounded-xl px-4 py-2 border-2 border-gray-400 focus:border-primary"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* Boton de continuar */}
      <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-full text-white">
        Continue
      </button>
    </form>
  );
}
