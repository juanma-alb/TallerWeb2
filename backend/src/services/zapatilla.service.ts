import { Zapatilla } from '@prisma/client'
import { ZapatillaRepository } from '../repository/zapatilla.repository'
import { ZapatillaConRelaciones } from '../types/zapatilla.type'

export class ZapatillaService {
    private repo = new ZapatillaRepository()

    async getFilteredZapatillas(query: any): Promise<Zapatilla[]> {
        const { marcas, colores, sexos, search, minPrice, maxPrice, talles } =
            query

        const where: any = {}

        if (marcas) {
            where.marca = {
                nombre: {
                    in: (typeof marcas === 'string'
                        ? marcas.split(',')
                        : marcas
                    ).map((m: string) => m.toLowerCase()),
                },
            }
        }

        if (colores) {
            where.color = {
                nombre: {
                    in: (typeof colores === 'string'
                        ? colores.split(',')
                        : colores
                    ).map((c: string) => c.toLowerCase()),
                },
            }
        }

        if (sexos) {
            where.sexo = {
                in: typeof sexos === 'string' ? sexos.split(',') : sexos,
            }
        }

        if (search) {
            where.OR = [
                { nombre: { contains: search } },
                { descripcion: { contains: search } },
            ]
        }

        if (minPrice || maxPrice) {
            where.precio = {}
            if (minPrice) where.precio.gte = parseFloat(minPrice)
            if (maxPrice) where.precio.lte = parseFloat(maxPrice)
        }

        const zapatillas = await this.repo.findAll(where)

        if (talles) {
            const tallesArray = (
                typeof talles === 'string' ? talles.split(',') : talles
            )
                .map(Number)
                .filter((n: any) => !isNaN(n))

            return zapatillas.filter(z =>
                z.stock.some(
                    s =>
                        s.activo &&
                        s.cantidad > 0 &&
                        s.talle?.numero !== undefined &&
                        tallesArray.includes(s.talle.numero)
                )
            )
        }

        return zapatillas
    }

    async getById(id: number): Promise<ZapatillaConRelaciones | null> {
        if (id <= 0) throw new Error('ID inválido')
        return this.repo.findById(id)
    }

    async create(data: Omit<Zapatilla, 'id'>): Promise<Zapatilla> {
        if (!data.nombre) throw new Error('El nombre es obligatorio')
        return this.repo.create(data)
    }

    async update(
        id: number,
        data: Partial<Omit<Zapatilla, 'id'>>
    ): Promise<Zapatilla> {
        if (id <= 0) throw new Error('ID inválido')
        return this.repo.update(id, data)
    }

    async delete(id: number): Promise<void> {
        if (id <= 0) throw new Error('ID inválido')
        return this.repo.delete(id)
    }
}
