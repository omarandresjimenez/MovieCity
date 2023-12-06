import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  of,
  map,
  takeLast,
} from 'rxjs';

import { MovieApiService } from './movies.api.service';
import { Movie } from '../../../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieCatalogService {
  private movieCatalog = new BehaviorSubject<Movie[]>([]);
  private randomMovie = new BehaviorSubject<Movie | null>(null);
  private favoriteMovies = new BehaviorSubject<Movie[]>([]);

  private service: MovieApiService = inject(MovieApiService);

  get movieCatalog$() {
    return this.movieCatalog.asObservable();
  }

  get favorites$() {
    return this.favoriteMovies.asObservable();
  }

  get randomMovie$() {
    return this.randomMovie.asObservable();
  }

  public searchMovies(search: string): void {
    combineLatest([
      this.service.getFavoriteMovies(),
      this.service.getMovies(),
    ]).subscribe(([favorites, res]) => {
      const movies = !search?.trim()
        ? res
        : res.filter(
            (mov: Movie) =>
              mov.title.toLocaleLowerCase().search(search.toLocaleLowerCase()) >
                -1 ||
              mov.description
                .toLocaleLowerCase()
                .search(search.toLocaleLowerCase()) > -1
          );
      this.movieCatalog.next(
        movies.map((mov: Movie) => {
          return {
            ...mov,
            isFavorite: favorites.find((f) => f === mov.id) ? true : false,
          };
        })
      );
    });
  }

  public getFavoriteMovies(): void {
    // if (this.favoriteMovies.getValue().length === 0) {
    this.service.getFavoriteMovies().subscribe((res: string[]) => {
      const movies = this.movieCatalog.getValue();
      movies.forEach((movie: Movie) => {
        movie.isFavorite = res.find((m) => m === movie.id) ? true : false;
      });
      this.movieCatalog.next(movies);
      this.setMoviesFromFavorites(res);
    });
    // }
  }

  private setMoviesFromFavorites = (res: string[]) => {
    combineLatest([this.service.getMovies(), of(res)]).subscribe(
      ([movies, favorites]) => {
        this.favoriteMovies.next(
          movies
            .filter((m) => favorites.find((f) => f === m.id))
            .map((m) => ({ ...m, isFavorite: true }))
        );
      }
    );
  };

  public addMovieToFavorites(movieId: string): void {
    this.service.addMovieToFavorites(movieId).subscribe((res: string[]) => {
      this.setMoviesFromFavorites(res);
      const movies = this.movieCatalog.getValue();
      movies.forEach((movie: Movie) => {
        if (movie.id === movieId) {
          movie.isFavorite = true;
        }
      });
      this.movieCatalog.next(movies);
    });
  }

  public removeMovieFromFavorites(movieId: string): void {
    this.service
      .removeMovieFromFavorites(movieId)
      .subscribe((res: string[]) => {
        this.setMoviesFromFavorites(res);
        const movies = this.movieCatalog.getValue();
        movies.forEach((movie: Movie) => {
          if (movie.id === movieId) {
            movie.isFavorite = false;
          }
        });
        this.movieCatalog.next(movies);
      });
  }

  public getMovie(movieId: string): Observable<Movie> {
    return this.service.getMovies().pipe(
      map((movies) => movies.filter((m) => m.id === movieId)[0]),
      takeLast(1)
    );
  }

  public getRandomMovie() {
    this.service.getMovies().subscribe((res: Movie[]) => {
      this.randomMovie.next(res[Math.floor(Math.random() * res.length)]);
    });
  }
}
