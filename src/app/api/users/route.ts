// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');

  try {
    if (wallet) {
      // Find user by wallet address
      const user = await prisma.usuario.findUnique({
        where: { wallet },
        include: { currentPsm: true },
      });
      return NextResponse.json(user);
    } else {
      // Get all users (if no wallet parameter provided)
      const users = await prisma.usuario.findMany({
        orderBy: { createdDate: 'desc' },
        include: { currentPsm: true },
      });
      return NextResponse.json(users);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const {
    nombre,
    apellido,
    email,
    fechaNacimiento,
    telefono,
    lugarResidencia,
    wallet,
    owner,
    currentPsmId,
  } = await request.json();

  try {
    // Upsert operation - create or update user
    const userData = {
      nombre,
      apellido,
      email,
      fechaNacimiento: new Date(fechaNacimiento),
      telefono: telefono || '',
      lugarResidencia: lugarResidencia || '',
      owner: owner || wallet,
      wallet,
      horarioEnvio: new Date(),
      updatedDate: new Date(),
    };

    const user = await prisma.usuario.upsert({
      where: { wallet },
      update: userData,
      create: {
        ...userData,
        createdDate: new Date(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save user data' },
      { status: 500 }
    );
  }
}