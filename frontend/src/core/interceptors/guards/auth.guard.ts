import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUsuarioService } from '../../../app/api/services/usuario/auth-usuario.service';

export const authGuard: CanActivateFn = () => {
const auth = inject<AuthUsuarioService>(AuthUsuarioService);
  const router = inject(Router);

  if (auth.token) return true;

  router.navigate(['/usuario/signin']);
  return false;
};
