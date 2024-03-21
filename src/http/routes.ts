import { type FastifyInstance } from 'fastify'
import { register } from './controllers/RegisterController'

export async function appRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', register)
}
