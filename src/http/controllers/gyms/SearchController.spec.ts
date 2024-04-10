import request from "supertest"
import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Search Gyms (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test("Can be able to search gyms by title.", async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description",
        phone: "119999999",
        latitude: -8.0084992,
        longitude: -34.9241344,
      })

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some description",
        phone: "119999999",
        latitude: -8.0084992,
        longitude: -34.9241344,
      })

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "JavaScript",
      })
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    ])
  })
})
