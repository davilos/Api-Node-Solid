import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { create } from "./CreateController"
import { validate } from "./ValidateController"
import { metrics } from "./MetricsController"
import { history } from "./HistoryController"

export async function checkInsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook("onRequest", verifyJWT)

  app.get("/check-ins/history", history)
  app.get("/check-ins/metrics", metrics)

  app.post("/gyms/:gymId/check-ins", create)
  app.patch("/check-ins/:checkInId/validate", validate)
}
