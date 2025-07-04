import { Router } from 'express';
import { UsuarioController } from '../controller/usuario.controller';

const r = Router();
const c = new UsuarioController();

r.post('/register', c.signup);
r.post('/login', c.signin);
r.post('/forgot-password', c.forgot);
r.post('/reset-password', c.reset);

export default r;
