'use client'
import  { useState } from 'react';
import { Save, User } from 'lucide-react';

export default function Profile() {
  const [formData, setFormData] = useState({
    nombre: 'Carlos',
    apellido: 'Silva',
    email: 'carlos@email.com',
    telefono: '+1234567890',
    lugarResidencia: 'Buenos Aires',
    fechaNacimiento: '1990-05-15',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <User className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-textPrimary">Profile Settings</h1>
      </div>

      <div className="max-w-2xl">
        <div className="bg-surface p-6 rounded-lg border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="lugarResidencia"
                value={formData.lugarResidencia}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Birth Date</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
              />
            </div>
          </div>

          <button className="mt-6 bg-primary hover:bg-opacity-80 text-white py-2 px-6 rounded-lg flex items-center space-x-2 transition-colors">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}