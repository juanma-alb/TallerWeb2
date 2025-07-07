import { Request, Response } from 'express';
import { StockService } from '../services/stock.service';

export class StockController {
  constructor(private readonly stockService = new StockService()) {}

  async createStock(req: Request, res: Response): Promise<void> {
    try {
      const { zapatillaId, talleId } = req.body;

      if (!zapatillaId || !talleId) {
        res.status(400).json({ error: 'Faltan datos obligatorios' });
        return;
      }

      // talleId puede ser string o array de strings si vienen varios talles
      const talles = Array.isArray(talleId) ? talleId : [talleId];

      // Crear un array de objetos con cantidad para cada talle
      const stockItems = talles.map((id: string) => {
        // Para cada talle, esperamos que haya un campo cantidad_<id> en form-data
        const cantidadStr = req.body[`cantidad_${id}`];
        const cantidad = cantidadStr ? Number(cantidadStr) : 0;

        if (cantidad <= 0) {
          throw new Error(`Cantidad inválida para talle ${id}`);
        }

        return {
          zapatillaId: Number(zapatillaId),
          talleId: Number(id),
          cantidad,
        };
      });

      //crear múltiples stocks a la vez
      const createdStock = await this.stockService.createMultipleStock(stockItems);

      res.status(201).json(createdStock);
    } catch (error) {
      console.error('Error al crear stock:', error);
      res.status(500).json({ error: error || 'Error al crear stock' });
    }
  }
}
