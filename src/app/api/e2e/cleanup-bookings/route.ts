import { db } from '@/db/prisma';
import { NextResponse } from 'next/server';

const userId = process.env.E2E_TEST_USER_ID!;

export async function POST(req: Request) {
  const isE2E = req.headers.get('x-e2e-test') === 'true';

  if (!isE2E) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { roomId } = body;

  if (!userId || !roomId) {
    return NextResponse.json(
      { error: 'userId and roomId are required' },
      { status: 400 }
    );
  }

  await db.booking.deleteMany({
    where: {
      userId: userId,
      roomId: BigInt(roomId),
    },
  });

  return NextResponse.json({ success: true });
}
