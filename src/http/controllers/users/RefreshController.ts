import { type FastifyRequest, type FastifyReply } from "fastify"

export async function refresh(
  request: FastifyRequest,
  response: FastifyReply,
): Promise<FastifyReply> {
  await request.jwtVerify({ onlyCookie: true })

  const token = await response.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await response.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    },
  )

  return await response
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}
