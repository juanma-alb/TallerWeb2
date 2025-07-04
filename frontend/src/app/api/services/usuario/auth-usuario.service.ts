import { Injectable, signal } from '@angular/core';
import { Usuario } from '../../../modules/usuario/interfaces/usuario.interface';
import { AuthResponse } from '../../../api/services/usuario/interfaces/auth-response.interface';
import { UsuarioMapper } from '../../../api/services/usuario/mappings/usuario.mapper';

@Injectable({ providedIn: 'root' })
export class AuthUsuarioService {
  usuario = signal<Usuario | null>(null);
  _token  = signal<string | null>(null);

  constructor() {
    if (typeof window !== 'undefined') {
      const rawUser  = localStorage.getItem('usuario');
      const rawToken = localStorage.getItem('token');
      if (rawUser)  this.usuario.set(JSON.parse(rawUser));
      if (rawToken) this._token.set(rawToken);
    }
  }

  login(resp: AuthResponse) {
    this.usuario.set(UsuarioMapper.mapUsuarioRestToUsuario(resp.usuario));
    this._token.set(resp.token);
    localStorage.setItem('usuario', JSON.stringify(resp.usuario));
    localStorage.setItem('token', resp.token);
  }

  logout() {
    this.usuario.set(null);
    this._token.set(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }

  get token() { return this._token(); }
}
