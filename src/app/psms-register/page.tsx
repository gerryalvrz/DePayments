"use client";
import { useState } from "react";

export default function RegisterPSM() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
    telefono: "",
    lugarResidencia: "",
    owner: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/psms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({
          nombre: "",
          apellido: "",
          email: "",
          fechaNacimiento: "",
          telefono: "",
          lugarResidencia: "",
          owner: "",
        });
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-surface p-6 rounded-lg border border-border mt-10">
      <h2 className="text-2xl font-bold text-textPrimary mb-6">Register New PSM</h2>

      {success && (
        <div className="mb-4 text-green-500 font-medium">PSM registered successfully!</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["nombre", "First Name"],
          ["apellido", "Last Name"],
          ["email", "Email"],
          ["fechaNacimiento", "Date of Birth (YYYY-MM-DD)"],
          ["telefono", "Phone"],
          ["lugarResidencia", "Location"],
          ["owner", "Owner ID / Wallet / User ID"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            <input
              type="text"
              name={name}
              value={(form as any)[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-primary hover:bg-opacity-80 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}
