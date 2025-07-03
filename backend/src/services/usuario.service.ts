import { UsuarioRepository } from "../repository/usuario.respository";
import bcrypt from "bcryptjs";
import createError from 'http-errors';
import jwt from "jsonwebtoken";

export class UsuarioService {
    
  private repo = new UsuarioRepository();

  async signup(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
}) {
  const existingUser = await this.repo.findByEmail(data.email);
  if (existingUser) {
    throw createError(400, 'Email ya registrado');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  return this.repo.create({ ...data, password: hashedPassword });
}

  
  async signin(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw createError(401, 'Credenciales inválidas');

    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) throw createError(401, 'Credenciales inválidas');

    return {
      usuario: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address
      }
    };
  }
}
