import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { catchError, switchMap, throwError } from 'rxjs';
import { Token } from '../services/token';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const tokenService = inject(Token);
  const router = inject(Router);

  const token = tokenService.getAccessToken();

  if (req.url.includes('/auth')) {
    return next(req);
  }

  let authReq = req;

  if (token) {
    const user = tokenService.getUser();
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
         'X-User-Role': user?.role || '',
          'X-User-Id': user?.userId?.toString() || ''

      }
    });
  }

  return next(authReq).pipe(

    catchError((err) => {

      if (err.status === 401) {

        const refreshToken = tokenService.getRefreshToken();

        if (!refreshToken) {
          tokenService.clear();
          router.navigate(['/auth/login']);
          return throwError(() => err);
        }

        return authService.refreshToken(refreshToken).pipe(

          switchMap((res: any) => {

            tokenService.setAccessToken(res.token);

            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.token}`
              }
            });

            return next(newReq);
          }),

          catchError(() => {
            tokenService.clear();
            router.navigate(['/auth/login']);
            return throwError(() => err);
          })
        );
      }

      if (err.status === 403) {
        return throwError(() => err);
      }

      if (err.status === 500) {
        alert('Something went wrong');
      }

      return throwError(() => err);
    })
  );
};
