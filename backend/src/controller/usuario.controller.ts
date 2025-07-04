import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';

export class UsuarioController {
  private service = new UsuarioService();

  signup = async (req: Request, res: Response) => {
    const result = await this.service.signup(req.body);
    res.status(201).json(result);
  };

  signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.service.signin(email, password);
    res.json(result);
  };

  forgot = async (req: Request, res: Response) => {
    await this.service.forgot(req.body.email);
    res.json({ message: 'Si el email existe, se envió el enlace.' });
  };

  reset = async (req: Request, res: Response) => {
    await this.service.reset(req.body.token, req.body.password);
    res.json({ message: 'Contraseña actualizada' });
  };
}
