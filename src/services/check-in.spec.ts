import { test, expect, describe, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInService } from "./check-in"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error"
import { MaxDistanceError } from "./errors/max-distance-error"

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe("Check-In Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -8.0084992,
      longitude: -34.9241344,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test("Can do a check in.", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -8.0084992,
      userLongitude: -34.9241344,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test("Can not be possible to check in twice in the same day.", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -8.0084992,
      userLongitude: -34.9241344,
    })

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -8.0084992,
        userLongitude: -34.9241344,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  test("Can be possible to check in twice but in different days.", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -8.0084992,
      userLongitude: -34.9241344,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -8.0084992,
      userLongitude: -34.9241344,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test("Can not be able to check in on a distant gym.", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-8.0084992),
      longitude: new Decimal(-34.9241344),
    })

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -8.2284992,
        userLongitude: -34.6241344,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
