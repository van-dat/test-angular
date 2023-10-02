import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})


export class ChamcongService {
  api = 'http://localhost:5000/api/chamcong';
  jsonToken: any
  headers: any

  constructor(private http: HttpClient, private useSvr: UserService) {
    this.jsonToken = this.useSvr.checkLogin();
    this.headers = new HttpHeaders().set("Authorization", `Bearer ${this.jsonToken.jwt}`);
  }

  getChamcong(): Observable<any> {
    return this.http.get<any>(this.api);
  }
  getChamcongUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/me/${id}`, { headers: this.headers })
  }
  chamcong(data :any): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.api,data, { headers: this.headers });
  }
}
