
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(request: Request) {
  // noStore();
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get('userName');
  const content = searchParams.get('content');
 
  try {
    if (!userName || !content) throw new Error('userName and content  required');
    await sql`INSERT INTO MESSAGES (userName, content) VALUES (${userName}, ${content});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const messages = await sql`SELECT * FROM MESSAGES;`;
  return NextResponse.json({ messages }, { status: 200, headers: { 'Cache-Control': 'no-store' } } );
}