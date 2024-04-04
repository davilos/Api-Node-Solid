import { test, expect, describe, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymService } from "./create-gym"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe("Register Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  test("Can create a gym.", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -8.0084992,
      longitude: -34.9241344,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
