import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'], // dá para colocar logs e aí o prisma mostra a query que foi executada
})
