import { Prisma } from '@prisma/client'

export type ZapatillaConRelaciones = Prisma.ZapatillaGetPayload<{
    include: {
        marca: true
        color: true
        stock: {
            include: {
                talle: true
            }
        }
    }
}>
