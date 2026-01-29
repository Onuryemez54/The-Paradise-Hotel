import { db } from '@/db/prisma';
import { mockBookingData } from 'e2e/helpers/mockBookingData';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const isE2E = req.headers.get('x-e2e-test') === 'true';

  if (!isE2E) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const booking = await db.booking.create({
    data: mockBookingData,
  });

  return NextResponse.json({ id: booking.id });
}
