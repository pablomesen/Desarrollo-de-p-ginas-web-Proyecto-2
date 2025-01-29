// services/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovie } from '../../../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.apiUrl}/getMovies`);
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movies/${id}`);
  }

  addMovie(movie: Omit<IMovie, '_id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/movies`, movie);
  }

  editMovie(id: string, movie: Partial<IMovie>): Observable<any> {
    return this.http.put(`${this.apiUrl}/movies/${id}`, movie);
  }
}