'use client'

import { useState, useEffect, FormEvent } from 'react'

interface PSM {
  id: string
  nombre: string
  apellido: string
}
interface Usuario {
  id: string
  nombre: string
  apellido: string
  email: string
  fechaNacimiento: string
  telefono?: string
  lugarResidencia?: string
  owner: string
  currentPsm?: PSM | null
}

interface UserForm {
  nombre?: string
  apellido?: string
  email?: string
  fechaNacimiento?: string
  telefono?: string
  lugarResidencia?: string
  owner?: string
  currentPsmId?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<Usuario[]>([])
  const [psms, setPsms] = useState<PSM[]>([])
  const [form, setForm] = useState<UserForm>({})
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
    fetchPsms()
  }, [])

  async function fetchUsers() {
    const res = await fetch('/api/users')
    setUsers(await res.json())
  }
  async function fetchPsms() {
    const res = await fetch('/api/psms')
    setPsms(await res.json())
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
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
      currentPsmId: form.currentPsmId || null,
    }
    const url = editingId ? `/api/users/${editingId}` : '/api/users'
    const method = editingId ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      setForm({})
      setEditingId(null)
      fetchUsers()
    }
  }

  function startEdit(u: Usuario) {
    setEditingId(u.id)
    setForm({
      nombre:        u.nombre,
      apellido:      u.apellido,
      email:         u.email,
      fechaNacimiento: u.fechaNacimiento.split('T')[0],
      telefono:      u.telefono,
      lugarResidencia: u.lugarResidencia,
      owner:         u.owner,
      currentPsmId:  u.currentPsm?.id || '',
    })
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this User?')) return
    await fetch(`/api/users/${id}`, { method: 'DELETE' })
    fetchUsers()
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Usuario Manager</h1>
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

        <select
          name="currentPsmId"
          value={form.currentPsmId||''}
          onChange={handleChange}
        >
          <option value="">— No PSM —</option>
          {psms.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="col-span-2 bg-green-600 text-white p-2 rounded"
        >
          {editingId ? 'Update User' : 'Create User'}
        </button>
      </form>

      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Owner</th>
            <th className="border p-2">Current PSM</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border p-2">{u.nombre} {u.apellido}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.owner}</td>
              <td className="border p-2">
                {u.currentPsm ? `${u.currentPsm.nombre} ${u.currentPsm.apellido}` : '—'}
              </td>
              <td className="border p-2 space-x-2">
                <button onClick={() => startEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
