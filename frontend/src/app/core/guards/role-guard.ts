import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from '../services/token';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(Token);

  const user = tokenService.getUser();
  const userRole = user?.role;

  const allowedRoles = route.data?.['roles'] as string[];

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  if (allowedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
