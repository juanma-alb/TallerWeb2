import { Router } from 'express'
import { MarcaController } from '../../controller/marca.controller'

export const marcaRouter = Router()

const marcaController = new MarcaController()

marcaRouter.get('/', marcaController.findAll.bind(marcaController))
