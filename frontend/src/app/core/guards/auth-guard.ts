import { inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from '../services/token';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const tokenService = inject(Token);

  if (!tokenService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
