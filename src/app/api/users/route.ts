//@ts-nocheck
// List & Create Usuarios (with optional currentPsmId)
import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'


export async function GET() {
  console.log("users api")
  const users = await prisma.usuario.findMany({
    orderBy: { createdDate: 'desc' },
    include: { currentPsm: true },
  })
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const {
    nombre,
    apellido,
    email,
    fechaNacimiento,
    telefono,
    lugarResidencia,
    owner,
    currentPsmId,
  }: {
    nombre: string
    apellido: string
    email: string
    fechaNacimiento: string
    telefono?: string
    lugarResidencia?: string
    owner: string
    currentPsmId?: string
  } = await req.json()

  const data: any = {
    nombre,
    apellido,
    email,
    fechaNacimiento: new Date(fechaNacimiento),
    telefono,
    lugarResidencia,
    owner,
    horarioEnvio: new Date(),
    createdDate: new Date(),
    updatedDate: new Date(),
  }
  if (currentPsmId) data.currentPsm = { connect: { id: currentPsmId } }

  const newUser = await prisma.usuario.create({ data })
  return NextResponse.json(newUser)
}
