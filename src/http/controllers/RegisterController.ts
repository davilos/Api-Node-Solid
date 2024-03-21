import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterService } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export async function register (
  request: FastifyRequest,
  response: FastifyReply): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsersRepository)

    await registerService.execute({
      name,
      email,
      password
    })
  } catch (error) {
    return await response.status(409).send()
  }

  return await response.status(201).send()
}
