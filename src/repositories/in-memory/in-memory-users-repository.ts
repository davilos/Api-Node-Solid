import { type Prisma, type User } from '@prisma/client'
import { type UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail (email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)

    if (user === undefined) {
      return null
    }

    return user
  }

  async create (data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.items.push(user)

    return user
  }
}
