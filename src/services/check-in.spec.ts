import { test, expect, describe, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInService } from "./check-in"

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe("Check-In Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test("Can do a check in.", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test("Can not be possible to check in twice in the same day.", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    })

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  test("Can be possible to check in twice but in different days.", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
