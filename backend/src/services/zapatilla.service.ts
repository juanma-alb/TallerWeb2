import { Zapatilla } from '@prisma/client'
import { ZapatillaRepository } from '../repository/zapatilla.repository'
import { ZapatillaConRelaciones } from '../types/zapatilla.type'

export class ZapatillaService {
    private repo = new ZapatillaRepository()

    async getAll(): Promise<ZapatillaConRelaciones[]> {
        const zapatillas = await this.repo.findAll()

        return zapatillas.filter(z =>
            z.stock?.some(s => s.activo && s.cantidad > 0)
        )
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
