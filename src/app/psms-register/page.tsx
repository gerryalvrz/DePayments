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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.nombre.trim()) newErrors.nombre = "First name is required";
    if (!form.apellido.trim()) newErrors.apellido = "Last name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email";
    if (!form.fechaNacimiento) newErrors.fechaNacimiento = "Date of birth is required";
    if (!form.telefono.match(/^\+?[0-9\s\-]{7,15}$/)) newErrors.telefono = "Invalid phone number";
    if (!form.lugarResidencia.trim()) newErrors.lugarResidencia = "Location is required";
    if (!form.owner.trim()) newErrors.owner = "Owner ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear individual error
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
        setErrors({});
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  const renderInput = (
    name: keyof typeof form,
    label: string,
    type: string = "text",
    placeholder?: string
  ) => (
    <div key={name}>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-background border ${
          errors[name] ? "border-red-500" : "border-border"
        } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary`}
      />
      {errors[name] && (
        <p className="text-sm text-red-400 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-xl mx-auto bg-surface p-6 rounded-lg border border-border mt-10">
      <h2 className="text-2xl font-bold text-textPrimary mb-6">Register New PSM</h2>

      {success && (
        <div className="mb-4 text-green-500 font-medium">
          ✅ PSM registered successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderInput("nombre", "First Name")}
        {renderInput("apellido", "Last Name")}
        {renderInput("email", "Email", "email")}
        {renderInput("fechaNacimiento", "Date of Birth", "date")}
        {renderInput("telefono", "Phone Number", "tel", "+52 555 123 4567")}
        {renderInput("lugarResidencia", "Location")}
        {renderInput("owner", "Owner ID / Wallet")}

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
