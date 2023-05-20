import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { request } from 'http'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memoryById = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memoryById
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false), // o coerce converte o valor que chegar para Boolean, como Boolean(0) = false
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const newMemory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: '123456',
      },
    })

    return newMemory
  })

  app.put('/memories/:id', async () => {})

  app.delete('/memories/:id', async (request) => {
    
}
