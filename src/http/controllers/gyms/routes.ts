import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { search } from "./SearchController"
import { nearby } from "./NearbyController"
import { create } from "./CreateController"

export async function gymsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook("onRequest", verifyJWT)

  app.get("gyms/search", search)
  app.get("gyms/nearby", nearby)

  app.post("/gyms", create)
}
