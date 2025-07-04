import { Zapatilla } from '@prisma/client'
import { ZapatillaRepository } from '../repository/zapatilla.repository'

export class ZapatillaService {
    private repo = new ZapatillaRepository()

    async getAll(): Promise<Zapatilla[]> {
        return this.repo.findAll()
    }

    async getById(id: number): Promise<Zapatilla | null> {
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
