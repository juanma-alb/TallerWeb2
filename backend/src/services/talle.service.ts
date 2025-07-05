import { Talle } from '@prisma/client'
import { TalleRepository } from '../repository/talle.repository'

export class TalleService {
    private repo = new TalleRepository()

    async getAll(): Promise<Talle[]> {
        return await this.repo.findAll()
    }
}
