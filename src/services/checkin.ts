import { type CheckIN } from "@prisma/client"
import { type CheckInsRepository } from "@/repositories/check-ins-repository"

interface CheckInServiceRequest {
  userId: string
  gymId: string
}

interface CheckInServiceResponse {
  checkIn: CheckIN
}

export class CheckInService {
	constructor(private readonly checkInRepository: CheckInsRepository) {}

	async execute({
		userId,
		gymId,
	}: CheckInServiceRequest): Promise<CheckInServiceResponse> {
		const checkIn = await this.checkInRepository.create({
			user_id: userId,
			gym_id: gymId,
		})

		return {
			checkIn,
		}
	}
}
