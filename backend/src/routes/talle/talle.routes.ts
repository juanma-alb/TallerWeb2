import { Router } from 'express'
import { TalleController } from '../../controller/talle.controller'

export const talleRouter = Router()

const talleController = new TalleController()

talleRouter.get('/', talleController.findAll.bind(talleController))
