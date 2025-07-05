import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class MarcaRepository {
    findAll() {
        return prisma.marca.findMany()
    }
}
