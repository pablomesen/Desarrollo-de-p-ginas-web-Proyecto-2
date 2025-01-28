import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrl = 'http://localhost:3000/api'; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    
    this.isAuthenticatedSubject.next(this.hasValidToken());
  }

  login(credentials: { credential: string; password: string }): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, credentials).pipe(
      tap((response: any) => {
        
        this.setToken(response.token);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError(this.handleError) 
    );
  }

  register(user: { userName: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.backendUrl}/register`, user).pipe(
      catchError(this.handleError) 
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.backendUrl}/logout`, {}).pipe(
      tap(() => {
        
        this.clearToken();
        this.isAuthenticatedSubject.next(false);
      }),
      catchError(this.handleError) 
    );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem('token');
  
    return !!token;
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private clearToken(): void {
    localStorage.removeItem('token');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    // Puedes agregar mensajes personalizados o lógica basada en el error.
    return throwError(() => new Error(error.message || 'Error del servidor'));
  }
}
