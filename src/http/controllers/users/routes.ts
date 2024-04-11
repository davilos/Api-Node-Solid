import { type FastifyInstance } from "fastify"
import { register } from "./RegisterController"
import { authenticate } from "./AuthenticateController"
import { profile } from "./ProfileController"
import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { refresh } from "./RefreshController"

export async function usersRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", register)
  app.post("/sessions", authenticate)

  app.patch("/token/refresh", refresh)

  // Authenticated
  app.get("/me", { onRequest: [verifyJWT] }, profile)
}
