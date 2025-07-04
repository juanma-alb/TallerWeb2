import { UsuarioRest } from './usuario.interface.rest';


export interface AuthResponse {
  token: string;
  usuario: UsuarioRest;
}
