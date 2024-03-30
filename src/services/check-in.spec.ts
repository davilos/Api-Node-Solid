import { test, expect, describe, beforeEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInService } from "./check-in"

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe("Check-In Service", () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new CheckInService(checkInsRepository)
	})

	test("Can do a check in.", async () => {
		const { checkIn } = await sut.execute({
			gymId: "gym-01",
			userId: "user-01",
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})
})
