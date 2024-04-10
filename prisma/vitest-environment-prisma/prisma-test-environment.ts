import "dotenv/config"

import { randomUUID } from "node:crypto"
import { execSync } from "node:child_process"
import { Environment } from "vitest"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// postgresql://docker:docker@localhost:5432/apisolid?schema=public

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Provide a value to the DATABASE_URL environment variable.")
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set("schema", schema)

  return url.toString()
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseURL

    execSync("npx prisma migrate deploy")

    console.log(generateDatabaseUrl(schema))

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
