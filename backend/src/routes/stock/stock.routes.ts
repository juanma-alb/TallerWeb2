import { Router } from "express";
import multer from "multer";
import { StockController } from "../../controller/stock.controller";

export const stockRouter = Router();
const stockController = new StockController();

const upload = multer(); 

//con form-data
stockRouter.post('/', upload.none(), stockController.createStock.bind(stockController));
