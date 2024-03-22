import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '@/services/authenticate'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

export async function authenticate (
  request: FastifyRequest,
  response: FastifyReply): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    await authenticateService.execute({
      email,
      password
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return await response.status(400).send({ message: error.message })
    }

    throw error
  }

  return await response.status(200).send()
}
