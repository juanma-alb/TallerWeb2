import { Router } from "express";
import { ZapatillaController } from "../../controller/zapatilla.controller";

export const zapatillaRouter = Router();

const zapatillaController = new ZapatillaController();

zapatillaRouter.get('/', zapatillaController.findAll.bind(zapatillaController));
zapatillaRouter.get('/:id', zapatillaController.findById.bind(zapatillaController));
zapatillaRouter.post('/', zapatillaController.create.bind(zapatillaController));
zapatillaRouter.put('/:id', zapatillaController.update.bind(zapatillaController));
zapatillaRouter.delete('/:id', zapatillaController.delete.bind(zapatillaController));