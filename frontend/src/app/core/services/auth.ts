import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  refreshToken(refreshToken: string) {
    return this.http.post<any>('http://localhost:8080/auth/refresh', {
      refreshToken
    });
  }

  register(data: any) {
    return this.http.post<any>('http://localhost:8080/auth/register', data);
  }

   logout() {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post('http://localhost:8080/auth/logout', {
      refreshToken: refreshToken
    });
  }

  setSession(data: any) {
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);

    localStorage.setItem(
      'user',
      JSON.stringify({
        userId: data.userId,
        role: data.role
      })
    );
  }

  clearSession() {
    localStorage.clear();
  }


  getUserById(userId: number) {
    return this.http.get(`http://localhost:8080/users/getUser/${userId}`);
  }

  updateProfile(userId: number, data: any) {
    return this.http.put(`http://localhost:8080/users/updateProfile/${userId}`, data);
  }
}
