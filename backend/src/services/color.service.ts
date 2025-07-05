import { Color } from '@prisma/client'
import { ColorRepository } from '../repository/color.repository'

export class ColorService {
    private repo = new ColorRepository()

    async getAll(): Promise<Color[]> {
        return await this.repo.findAll()
    }
}
