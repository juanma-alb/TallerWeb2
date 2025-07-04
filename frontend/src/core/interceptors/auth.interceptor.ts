import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthUsuarioService } from '../../app/api/services/usuario/auth-usuario.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject<AuthUsuarioService>(AuthUsuarioService);
  const token = auth.token;
  if (!token) return next(req);

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next(authReq);
};
