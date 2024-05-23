import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  noStore();
  try {
    const result =
      await sql`SELECT * FROM MESSAGES;`;
    console.log(result);
    return NextResponse.json({ result }, {  status: 200, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}