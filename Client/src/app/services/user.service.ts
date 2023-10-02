import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  jsonToken: any
  api = 'http://localhost:5000/api/user';
  headers: any
  constructor(private http: HttpClient) {
    this.jsonToken = this.checkLogin()
    this.headers = new HttpHeaders().set("Authorization", `Bearer ${this.jsonToken.jwt}`);
  }
  getUser(): Observable<any> {
    return this.http.get<any>(this.api, {headers:this.headers});
  }
  getOneUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/me/${id}`, { headers: this.headers });
  }
  PostUser(userData: any): Observable<any> {
    return this.http.post<any>(this.api, userData);
  }
  updateUser(id:string, data:any) : Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, data, {headers:this.headers}) 
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, data);
  }
  checkLogin(): any {
    let dataUser = sessionStorage.getItem('login');
    if (dataUser) {
      return JSON.parse(dataUser);
    } else {
      return false;
    }
  }

 
}
