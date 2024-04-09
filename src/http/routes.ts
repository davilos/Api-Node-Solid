import { type FastifyInstance } from "fastify"
import { register } from "./controllers/RegisterController"
import { authenticate } from "./controllers/AuthenticateController"
import { profile } from "./controllers/ProfileController"
import { verifyJWT } from "./middlewares/verify-jwt"

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", register)

  app.post("/sessions", authenticate)

  // Authenticated
  app.get("/me", { onRequest: [verifyJWT] }, profile)
}
