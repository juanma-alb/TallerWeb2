import { PrismaClient, Zapatilla } from '@prisma/client'
const prisma = new PrismaClient()

export class ZapatillaRepository {
    findAll() {
        return prisma.zapatilla.findMany({
            include: {
                marca: true,
                color: true,
                stock: {
                    include: {
                        talle: true,
                    },
                },
            },
        })
    }

    findById(id: number) {
        return prisma.zapatilla.findUnique({
            where: { id },
            include: {
                marca: true,
                color: true,
                stock: { include: { talle: true } },
            },
        })
    }

    create(data: Omit<Zapatilla, 'id'>) {
        return prisma.zapatilla.create({ data })
    }

    update(id: number, data: Partial<Omit<Zapatilla, 'id'>>) {
        return prisma.zapatilla.update({
            where: { id },
            data,
        })
    }

    delete(id: number) {
        prisma.stock.deleteMany({
            where: { zapatillaId: id },
        })
        prisma.zapatilla.delete({ where: { id } })
    }
}
