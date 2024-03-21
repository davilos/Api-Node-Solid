import { type UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute ({
    name,
    email,
    password
  }: RegisterServiceRequest): Promise<void> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail != null) {
      throw new Error('E-mail already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash
    })
  }
}
