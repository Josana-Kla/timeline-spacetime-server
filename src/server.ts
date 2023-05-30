import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true, // todas urls do front podem acessar o back
})
app.register(jwt, {
  secret: 'spacetime', // maneira de diferenciar os tokens gerados por esse backend de outros jwts gerados por outros backend. Algo que não seja fácil de conter em outras aplicações
})
app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
