import request from "supertest"
import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, test } from "vitest"

describe("Register (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test("Can be able to register.", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(response.statusCode).toEqual(201)
  })
})
