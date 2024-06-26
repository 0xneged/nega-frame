import { sql } from '@vercel/postgres'

export async function seed() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS spiners (
      id SERIAL PRIMARY KEY,
      fid VARCHAR(255) NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      "recievedrop" BOOLEAN NOT NULL DEFAULT FALSE
    );
    `

  console.log(`Created "users" table`)

  return {
    createTable,
  }
}