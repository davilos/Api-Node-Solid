import { type FastifyRequest, type FastifyReply } from "fastify"

export async function profile(
  request: FastifyRequest,
  response: FastifyReply,
): Promise<FastifyReply> {
  await request.jwtVerify()

  console.log(request.user.sub)

  return await response.status(200).send()
}
