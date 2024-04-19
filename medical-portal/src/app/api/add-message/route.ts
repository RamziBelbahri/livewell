import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get('userName');
  const content = searchParams.get('content');
 
  try {
    if (!userName || !content) throw new Error('userName and content  required');
    await sql`INSERT INTO MESSAGES (userName, content) VALUES (${userName}, ${content});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const pets = await sql`SELECT * FROM MESSAGES;`;
  return NextResponse.json({ pets }, { status: 200 });
}