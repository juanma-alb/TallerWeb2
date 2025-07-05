import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class ColorRepository {
    findAll() {
        return prisma.color.findMany()
    }
}
