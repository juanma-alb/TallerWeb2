import { Request, Response } from 'express'
import { TalleService } from '../services/talle.service'

export class TalleController {
    private service = new TalleService()

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.service.getAll()
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}
