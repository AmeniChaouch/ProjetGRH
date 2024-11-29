import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthentificationService);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('token');
  if (token && authService.isTokenValid(token)) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
