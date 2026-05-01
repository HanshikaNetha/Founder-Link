
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from './token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private http: HttpClient, private token: Token) {}

  private getHeaders(): HttpHeaders {
    const user = this.token.getUser();

    return new HttpHeaders({
      'X-User-Id': String(user?.userId),
      'X-User-Role': user?.role,
    });
  }

  // ✅ GET MY INVESTMENTS
  getMyInvestments(): Observable<any> {
    return this.http.get(`/api/investments/getMyInvestments`, {
      headers: this.getHeaders(),
    });
  }

  // ✅ CREATE INVESTMENT
  createInvestment(data: any): Observable<any> {
    return this.http.post(
      `/api/investments/createInvestment`,
      data,
      {
        headers: this.getHeaders(),
      }
    );
  }

  getInvestmentsByStartupId(startupId: number) {
    return this.http.get<any[]>(
      `/api/investments/getByStartup/${startupId}`
    );
  }

  approveInvestment(id: number) {
    return this.http.put(
      `/api/investments/approve/${id}`,
      {}
    );
  }

  rejectInvestment(id: number) {
    return this.http.put(
      `/api/investments/reject/${id}`,
      {}
    );
  }

}
