import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment.development';
import { Usuario, UsuarioRegistro } from '../../../modules/usuario/interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { UsuarioRest } from './interfaces/usuario.interface.rest';
import { UsuarioMapper } from './mappings/usuario.mapper';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    http = inject(HttpClient)

  constructor() { }

  crearUsuario(usuario: UsuarioRegistro) {
       return this.http.post<Usuario>(`${environment.api_url}/usuario/signup`, usuario);
  }

 iniciarSesion(data: { email: string; password: string }) : Observable<UsuarioRest>{
      return this.http.post<UsuarioRest>(`${environment.api_url}/usuario/signin`, data);
  }
}
