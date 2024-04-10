import { type FastifyRequest, type FastifyReply } from "fastify"
import { z } from "zod"
import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service"

export async function search(
  request: FastifyRequest,
  response: FastifyReply,
): Promise<FastifyReply> {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymsService = makeSearchGymsService()

  const { gyms } = await searchGymsService.execute({
    query,
    page,
  })

  return await response.status(200).send({
    gyms,
  })
}
