import { type FastifyInstance } from "fastify"
import { register } from "./controllers/RegisterController"
import { authenticate } from "./controllers/AuthenticateController"

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", register)

  app.post("/sessions", authenticate)
}
