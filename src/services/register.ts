import { type UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { type User } from "@prisma/client"

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
	constructor (private readonly usersRepository: UsersRepository) {}

	async execute ({
		name,
		email,
		password
	}: RegisterServiceRequest): Promise<RegisterServiceResponse> {
		const passwordHash = await hash(password, 6)

		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail != null) {
			throw new UserAlreadyExistsError()
		}

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash: passwordHash
		})

		return {
			user
		}
	}
}
