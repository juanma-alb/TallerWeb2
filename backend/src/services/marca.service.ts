import { Marca } from '@prisma/client'
import { MarcaRepository } from '../repository/marca.repository'

export class MarcaService {
    private repo = new MarcaRepository()

    async getAll(): Promise<Marca[]> {
        return await this.repo.findAll()
    }
}
