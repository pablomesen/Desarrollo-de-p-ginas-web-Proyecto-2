import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface User {
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
  private userEmailSubject = new BehaviorSubject<string>('');
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userEmail$ = this.userEmailSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar si hay un email guardado al iniciar
    const storedEmail = localStorage.getItem('userEmail');
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedEmail && storedUser) {
      this.isAuthenticatedSubject.next(true);
      this.userEmailSubject.next(storedEmail);
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: { credential: string; password: string }): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.opCode === 0) {
          // Guardar el email y estado de autenticación
          localStorage.setItem('userEmail', credentials.credential);
          this.userEmailSubject.next(credentials.credential);
          this.isAuthenticatedSubject.next(true);

          // Obtener información del usuario
          this.http.get(`${this.backendUrl}/getUsers`).subscribe((users: any) => {
            const currentUser = users.find((user: any) => user.email === credentials.credential);
            if (currentUser) {
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              this.currentUserSubject.next(currentUser);
            }
          });
        }
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
    localStorage.removeItem('userEmail');
    localStorage.removeItem('currentUser');
    this.isAuthenticatedSubject.next(false);
    this.userEmailSubject.next('');
    this.currentUserSubject.next(null);
    return of(null);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUserEmail(): string {
    console.log(this.userEmailSubject.value)
    return this.userEmailSubject.value;
    
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.role === 'admin';
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error(error.message || 'Error del servidor'));
  }
}