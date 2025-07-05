import { Router } from 'express'
import { ColorController } from '../../controller/color.controller'

export const colorRouter = Router()

const colorController = new ColorController()

colorRouter.get('/', colorController.findAll.bind(colorController))
