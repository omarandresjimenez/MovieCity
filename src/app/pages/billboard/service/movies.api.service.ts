import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../../../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private moviesApiUrl = '/assets/data/movies.json';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(this.moviesApiUrl)
      .pipe(catchError(this.handleError<Movie[]>('getMovies', [])));
  }

  getFavoriteMovies(): Observable<string[]> {
    const moviesIds = localStorage.getItem('favoriteMovies');
    return of(moviesIds ? JSON.parse(moviesIds) : []);
  }

  addMovieToFavorites(movieId: string): Observable<string[]> {
    const movieStore = localStorage.getItem('favoriteMovies');
    const movies = movieStore ? JSON.parse(movieStore) : [];
    if (!movies.find((m: string) => m === movieId)) {
      movies.push(movieId);
      localStorage.setItem('favoriteMovies', JSON.stringify(movies));
    }
    return of(movies);
  }

  removeMovieFromFavorites(movieId: string): Observable<string[]> {
    const movieStore = localStorage.getItem('favoriteMovies');
    const movies = movieStore ? JSON.parse(movieStore) : [];
    const index = movies.findIndex((m: string) => m === movieId);
    if (index > -1) {
      movies.splice(index, 1);
      localStorage.setItem('favoriteMovies', JSON.stringify(movies));
    }
    return of(movies);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
