// List & Create PSMs
import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
    console.log("hi")
  const psms = await prisma.pSM.findMany({ orderBy: { createdDate: 'desc' } })
  return NextResponse.json(psms)
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
  } = await req.json()

  const newPsm = await prisma.pSM.create({
    data: {
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
    },
  })
  return NextResponse.json(newPsm)
}
