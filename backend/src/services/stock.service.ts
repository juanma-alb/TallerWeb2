import { StockRepository } from '../repository/stock.repository';

interface CreateStockDto {
  zapatillaId: number;
  talleId: number;
  cantidad: number;
}

export class StockService {
  constructor(private readonly stockRepo = new StockRepository()) {}

  async createStock(data: CreateStockDto) {
    return this.stockRepo.create(data);
  }

  //crear varios stocks a la vez
  async createMultipleStock(items: CreateStockDto[]) {
    return this.stockRepo.createMany(items);
  }
}
