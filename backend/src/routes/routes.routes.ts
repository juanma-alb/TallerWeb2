import { Router } from 'express';
import { usuarioRouter } from './usuario/usuario.routes';
import authRouter from './auth.routes';       

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', authRouter);      

    router.use('/api/usuario', usuarioRouter);

    return router;
  }
}