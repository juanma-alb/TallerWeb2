import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class TalleRepository {
    findAll() {
        return prisma.talle.findMany()
    }
}
