import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
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
