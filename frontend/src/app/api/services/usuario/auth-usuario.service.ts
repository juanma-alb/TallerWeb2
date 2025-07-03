import { Injectable, signal } from '@angular/core';
import { Usuario } from '../../../modules/usuario/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthUsuarioService {

  usuario = signal<Usuario | null > (null)

  constructor() {
     if (typeof window !== 'undefined') {
         const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
          this.usuario.set(JSON.parse(usuarioGuardado));
        }
    }
   }

  setUsuario(usuario: Usuario) {
    this.usuario.set(usuario);
    if (typeof window !== 'undefined') {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  clearUsuario() {
    this.usuario.set(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('usuario');
    }
  }
}
