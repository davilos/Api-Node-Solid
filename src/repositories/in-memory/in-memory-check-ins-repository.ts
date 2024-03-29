import { type CheckIN, type Prisma } from "@prisma/client"
import { type CheckInsRepository } from "../check-ins-repository"
import { randomUUID } from "node:crypto"

export class InMemoryCheckInsRepository implements CheckInsRepository {
	public items: CheckIN[] = []

	async create (data: Prisma.CheckINUncheckedCreateInput): Promise<CheckIN> {
		const checkIn = {
			id: randomUUID(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
			created_at: new Date()
		}

		this.items.push(checkIn)

		return checkIn
	}
}
