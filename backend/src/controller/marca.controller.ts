import { Request, Response } from 'express'
import { MarcaService } from '../services/marca.service'

export class MarcaController {
    private service = new MarcaService()

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.service.getAll()
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}
