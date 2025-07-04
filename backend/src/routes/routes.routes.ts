import { Router } from 'express'
import { usuarioRouter } from './usuario/usuario.routes'
import { zapatillaRouter } from './zapatilla/zapatilla.routes'
import authRouter from './auth.routes'

export class AppRoutes {
    static get routes(): Router {
        const router = Router()

        router.use('/api/auth', authRouter)

        router.use('/api/usuario', usuarioRouter)

        router.use('/api/zapatilla', zapatillaRouter)

        return router
    }
}
