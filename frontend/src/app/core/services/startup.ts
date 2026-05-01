import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Startup {
  constructor(private http: HttpClient) {}

  getAllStartups(page: number = 0, size: number = 5): Observable<any> {
    return this.http.get(
      `/api/startups/getAllStartups?page=${page}&size=${size}`
    );
  }

  createStartup(data: any) {
    return this.http.post(
      `/api/startups/createStartup`,
      data
    );
  }

  getStartupById(id: number) {
    return this.http.get(`/api/startups/getStartupById/${id}`);
  }

  approveStartup(id: number) {
    return this.http.put(`/api/startups/admin/approve/${id}`, {});
  }

  rejectStartup(id: number) {
    return this.http.put(`/api/startups/admin/reject/${id}`, {});
  }
}
