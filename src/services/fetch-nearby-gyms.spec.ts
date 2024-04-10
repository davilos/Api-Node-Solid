import { test, expect, describe, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsService } from "./fetch-nearby-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe("Fetch Nearby Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(gymsRepository)
  })

  test("Can search for nearby gyms.", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -8.0084992,
      longitude: -34.9241344,
    })

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -6.9342808,
      longitude: -34.8986238,
    })

    const { gyms } = await sut.execute({
      userLatitude: -8.0084992,
      userLongitude: -34.9241344,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })])
  })
})
