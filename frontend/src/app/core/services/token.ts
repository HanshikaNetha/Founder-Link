import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Token {
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clear() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
