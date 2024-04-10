import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service"
import { type FastifyRequest, type FastifyReply } from "fastify"

export async function profile(
  request: FastifyRequest,
  response: FastifyReply,
): Promise<FastifyReply> {
  const getUserProfile = makeGetUserProfileService()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return await response.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
