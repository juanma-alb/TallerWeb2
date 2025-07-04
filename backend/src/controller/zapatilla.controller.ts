import { Request, Response } from 'express'
import { ZapatillaService } from '../services/zapatilla.service'

export class ZapatillaController {
    private service = new ZapatillaService()

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.service.getAll()
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ error: 'ID inválido' })
            return
        }

        try {
            const zap = await this.service.getById(id)
            if (!zap) {
                res.status(404).json({ error: 'Zapatilla no encontrada' })
                return
            }
            res.json(zap)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const newZap = await this.service.create(req.body)
            res.status(201).json(newZap)
        } catch (error) {
            res.status(400).json({ error: (error as Error).message })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ error: 'ID inválido' })
            return
        }

        try {
            const zap = await this.service.getById(id)
            if (!zap) {
                res.status(404).json({ error: 'Zapatilla no encontrada' })
                return
            }

            const updatedZap = await this.service.update(id, req.body)
            res.json(updatedZap)
        } catch (error) {
            res.status(400).json({ error: (error as Error).message })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ error: 'ID inválido' })
            return
        }

        try {
            const zap = await this.service.getById(id)
            if (!zap) {
                res.status(404).json({ error: 'Zapatilla no encontrada' })
                return
            }

            await this.service.delete(id)
            res.status(204).send() // Sin contenido, eliminación exitosa
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}
