'use client'

import { useState, useEffect, FormEvent } from 'react'

interface PSM {
  id: string
  nombre: string
  apellido: string
  email: string
  fechaNacimiento: string
  telefono?: string
  lugarResidencia?: string
  owner: string
}

export default function PSMPage() {
  const [psms, setPsms] = useState<PSM[]>([])
  const [form, setForm] = useState<Partial<PSM>>({})
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchPsms()
  }, [])

  async function fetchPsms() {
    const res = await fetch('/api/psms')
    setPsms(await res.json())
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const payload = {
      nombre: form.nombre!,
      apellido: form.apellido!,
      email: form.email!,
      fechaNacimiento: form.fechaNacimiento!,
      telefono: form.telefono,
      lugarResidencia: form.lugarResidencia,
      owner: form.owner || '',
    }
    const url = editingId ? `/api/psms/${editingId}` : '/api/psms'
    const method = editingId ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      setForm({})
      setEditingId(null)
      fetchPsms()
    }
  }

  function startEdit(p: PSM) {
    setEditingId(p.id)
    setForm({
      nombre: p.nombre,
      apellido: p.apellido,
      email: p.email,
      fechaNacimiento: p.fechaNacimiento.split('T')[0],
      telefono: p.telefono,
      lugarResidencia: p.lugarResidencia,
      owner: p.owner,
    })
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this PSM?')) return
    await fetch(`/api/psms/${id}`, { method: 'DELETE' })
    fetchPsms()
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">PSM Manager</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          name="nombre" value={form.nombre||''}
          onChange={handleChange} placeholder="Nombre" required
        />
        <input
          name="apellido" value={form.apellido||''}
          onChange={handleChange} placeholder="Apellido" required
        />
        <input
          type="email" name="email" value={form.email||''}
          onChange={handleChange} placeholder="Email" required
        />
        <input
          type="date" name="fechaNacimiento"
          value={form.fechaNacimiento||''}
          onChange={handleChange} required
        />
        <input
          name="telefono" value={form.telefono||''}
          onChange={handleChange} placeholder="Teléfono"
        />
        <input
          name="lugarResidencia" value={form.lugarResidencia||''}
          onChange={handleChange} placeholder="Lugar de residencia"
        />
        <input
          name="owner" value={form.owner||''}
          onChange={handleChange} placeholder="Owner" required
        />
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white p-2 rounded"
        >
          {editingId ? 'Update PSM' : 'Create PSM'}
        </button>
      </form>

      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Apellido</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Owner</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {psms.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.nombre}</td>
              <td className="border p-2">{p.apellido}</td>
              <td className="border p-2">{p.email}</td>
              <td className="border p-2">{p.owner}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => startEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
