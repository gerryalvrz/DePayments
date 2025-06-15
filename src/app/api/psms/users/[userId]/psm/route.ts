// app/api/users/[userId]/psm/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

interface Params { params: { userId: string } }

export async function GET(_: Request, { params }: Params) {
  const user = await prisma.usuario.findUnique({
    where: { id: params.userId },
    include: { currentPsm: true }
  });
  return NextResponse.json(user?.currentPsm ?? null);
}

export async function PUT(request: Request, { params }: Params) {
  const { psmId }: { psmId: string | null } = await request.json();
  const updated = await prisma.usuario.update({
    where: { id: params.userId },
    data: psmId
      ? { currentPsm: { connect: { id: psmId } } }
      : { currentPsm: { disconnect: true } }
  });
  return NextResponse.json(updated);
}
