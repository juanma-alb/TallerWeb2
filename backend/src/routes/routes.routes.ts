import { Router } from 'express'
import authRouter from './auth.routes'
import { usuarioRouter } from './usuario/usuario.routes'
import { zapatillaRouter } from './zapatilla/zapatilla.routes'
import { marcaRouter } from './marca/marca.routes'
import { talleRouter } from './talle/talle.routes'
import { colorRouter } from './color/color.routes'

export class AppRoutes {
    static get routes(): Router {
        const router = Router()

        router.use('/api/auth', authRouter)

        router.use('/api/usuario', usuarioRouter)

        router.use('/api/zapatilla', zapatillaRouter)

        router.use('/api/marca', marcaRouter)

        router.use('/api/talle', talleRouter)

        router.use('/api/color', colorRouter)

        return router
    }
}
