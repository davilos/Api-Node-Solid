import request from "supertest"
import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"

describe("Create Check-in (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test("Can be able to create a check-in.", async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        description: "Some description",
        phone: "119999999",
        latitude: -8.0084992,
        longitude: -34.9241344,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -8.0084992,
        longitude: -34.9241344,
      })

    expect(response.statusCode).toEqual(201)
  })
})
