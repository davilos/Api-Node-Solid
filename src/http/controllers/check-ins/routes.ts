import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"

export async function checkInsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook("onRequest", verifyJWT)
}
