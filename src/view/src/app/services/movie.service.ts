import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovie } from '../../../../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.apiUrl}/getMovies`);
  }

  editMovie(movieId: string, movieData: Partial<IMovie>): Observable<any> {
    return this.http.put(`${this.apiUrl}/movies/${movieId}`, movieData);
  }

  deleteMovie(movieId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movies/${movieId.toString()}`);
  }
}