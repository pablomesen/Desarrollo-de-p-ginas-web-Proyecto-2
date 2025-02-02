import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface User {
  id: string;
  userName: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrl = 'http://localhost:3000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Inicializar estado de autenticación y usuario
    const token = this.hasValidToken();
    const storedUser = this.getStoredUser();
    
    if (token && storedUser) {
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(storedUser);
    }
  }

  login(credentials: { credential: string; password: string }): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        this.setCurrentUser(response.user); // Asumiendo que el backend devuelve user
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
        this.clearCurrentUser();
        this.isAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
      }),
      catchError(this.handleError)
    );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.role === 'admin';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private clearToken(): void {
    localStorage.removeItem('token');
  }

  private clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error(error.message || 'Error del servidor'));
  }
}