import { type FastifyRequest, type FastifyReply } from "fastify"
import { z } from "zod"
import { makeFetchUserCheckInsHistoryService } from "@/services/factories/make-fetch-user-check-ins-history-service"

export async function history(
  request: FastifyRequest,
  response: FastifyReply,
): Promise<FastifyReply> {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryService = makeFetchUserCheckInsHistoryService()

  const { checkIns } = await fetchUserCheckInsHistoryService.execute({
    userId: request.user.sub,
    page,
  })

  return await response.status(200).send({
    checkIns,
  })
}
