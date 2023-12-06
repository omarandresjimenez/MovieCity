import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

import { MovieApiService } from './movies.api.service';
import { Movie } from '../../../models/Movie';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieCatalogService {
  private movieCatalog = new BehaviorSubject<Movie[]>([]);
  private randomMovie = new BehaviorSubject<Movie | null>(null);
  private ratingFilter = new BehaviorSubject<number>(1);

  // private service: MovieApiService;
  constructor(private service: MovieApiService) {
    //this.service = Inject(MovieApiService);
  }

  get movieCatalog$() {
    return this.movieCatalog.asObservable();
  }

  get ratingFilter$() {
    return this.ratingFilter.asObservable();
  }

  get randomMovie$() {
    return this.randomMovie.asObservable();
  }

  public searchMovies(search: string): void {
    this.service.getMovies().subscribe((res: Movie[]) => {
      this.movieCatalog.next(
        !search?.trim()
          ? res
          : res.filter(
              (mov: Movie) =>
                mov.title
                  .toLocaleLowerCase()
                  .search(search.toLocaleLowerCase()) > -1 ||
                mov.description
                  .toLocaleLowerCase()
                  .search(search.toLocaleLowerCase()) > -1
            )
      );
    });
  }

  public getMovie(movieId: string): Observable<Movie> {
    return this.service.getMovies().pipe(
      map((movies) => movies.filter((m) => m.id === movieId)[0]),
      tap((m) => console.log(m))
    );
  }

  public setFavoriteMovies() {
    this.service.getFavoriteMovies().subscribe((res: Movie[]) => {
      this.movieCatalog.next(res);
    });
  }

  public setRatingFilter(val: number): void {
    this.ratingFilter.next(val);
  }

  public getRandomMovie() {
    this.service.getMovies().subscribe((res: Movie[]) => {
      this.randomMovie.next(res[Math.floor(Math.random() * res.length)]);
    });
  }
}
