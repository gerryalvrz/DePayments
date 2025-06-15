// app/api/psms/[psmId]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

interface Params { params: { psmId: string } }

export async function PUT(req: Request, { params }: Params) {
  const {
    nombre,
    apellido,
    email,
    fechaNacimiento,
    telefono,
    lugarResidencia,
  } = await req.json()

  const updated = await prisma.pSM.update({
    where: { id: params.psmId },
    data: {
      nombre,
      apellido,
      email,
      fechaNacimiento: new Date(fechaNacimiento),
      telefono,
      lugarResidencia,
      updatedDate: new Date(),
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: Params) {
  await prisma.pSM.delete({ where: { id: params.psmId } })
  return NextResponse.json({ id: params.psmId })
}
