import { NextResponse } from 'next/server';
// When ready, import the Neon driver:
// import { neon } from '@neondatabase/serverless';

export async function GET() {
  // Database connection placeholder:
  // const sql = neon(process.env.DATABASE_URL);
  // const rows = await sql`SELECT version();`;

  return NextResponse.json({
    status: 'online',
    runtime: 'Node.js backend active',
    database: 'Neon DB driver installed and ready to connect'
  });
}