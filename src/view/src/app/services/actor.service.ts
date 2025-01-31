import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { IActor } from '../../../../models/Actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Get all actors
   */
  getActors(): Observable<IActor[]> {
    return this.http.get<IActor[]>(`${this.apiUrl}/getActors`).pipe(
      tap((data) => {
        console.log('Actores obtenidos del servidor:', data);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Get actor by ID
   */
  getActorById(id: string): Observable<IActor> {
    return this.http.get<IActor>(`${this.apiUrl}/getActor/${id}`).pipe(
      tap((data) => {
        console.log('Detalles del actor obtenidos:', data);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Add a new actor
   */
  addActor(actor: Omit<IActor, 'id'>): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/actors`, actor).pipe(
      tap((response) => {
        console.log('Actor añadido exitosamente:', response);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Edit an existing actor
   */
  editActor(id: string, actor: Partial<IActor>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/actors/${id}`, actor).pipe(
      tap((response) => {
        console.log('Actor actualizado exitosamente:', response);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Delete an actor
   */
  deleteActor(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/actor/${id}`).pipe(
      tap((response) => {
        console.log('Actor eliminado exitosamente:', response);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = error.error?.error || 'Solicitud inválida';
          break;
        case 404:
          errorMessage = error.error?.error || 'No encontrado';
          break;
        case 500:
          errorMessage = error.error?.error || 'Error del servidor';
          break;
        default:
          errorMessage = 'Ha ocurrido un error inesperado';
      }
    }

    console.error('Error in ActorService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}