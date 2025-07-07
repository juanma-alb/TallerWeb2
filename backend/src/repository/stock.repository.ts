import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateStockInput {
  zapatillaId: number;
  talleId: number;
  cantidad: number;
}

export class StockRepository {
  async create({ zapatillaId, talleId, cantidad }: CreateStockInput) {
    return prisma.stock.create({
      data: {
        zapatillaId,
        talleId,
        cantidad,
        activo: true,
      },
    });
  }

  //crear varios stocks a la vez
  async createMany(items: CreateStockInput[]) {
    return prisma.stock.createMany({
      data: items.map(item => ({
        ...item,
        activo: true,  // Aseguramos activo true para todos
      })),
      skipDuplicates: true, // evita error si ya existe el registro
    });
  }
}
