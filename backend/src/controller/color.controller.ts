import { Request, Response } from 'express'
import { ColorService } from '../services/color.service'

export class ColorController {
    private service = new ColorService()

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.service.getAll()
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}
