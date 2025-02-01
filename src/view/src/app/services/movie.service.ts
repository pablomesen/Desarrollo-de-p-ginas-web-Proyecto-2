import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, pipe } from 'rxjs';
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

  getMovieById(movieId: string): Observable<IMovie | undefined> { 
    return this.http.get<IMovie>(`${this.apiUrl}/movies/${movieId}`)
      .pipe(
        catchError(err => of(undefined))
      )
    ;
  }

  editMovie(movieId: string, movieData: Partial<IMovie>): Observable<any> {
    return this.http.put(`${this.apiUrl}/movies/${movieId}`, movieData);
  }

  updateMovie(movieId: string, movieData: IMovie): Observable<IMovie> {
    return this.http.patch<IMovie>(`${this.apiUrl}/movies/${movieId}`, movieData);
  }

  deleteMovie(movieId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movies/${movieId.toString()}`);
  }

  // add a new movie and return the movie object
  addMovie(movie:IMovie): Observable<IMovie> {
    return this.http.post<IMovie>(`${this.apiUrl}/movies`, movie);
  }
}