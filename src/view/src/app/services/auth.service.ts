import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrl = 'http://localhost:3000/api'; // Cambia esto según la URL de tu backend

  constructor(private http: HttpClient) {}

  login(credentials: { credential: string; password: string }): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, credentials);
  }

  register(user: { userName: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.backendUrl}/register`, user);
  }
}
