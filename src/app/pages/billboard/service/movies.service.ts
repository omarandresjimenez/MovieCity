import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { MovieApiService } from './movies.api.service';
import { Movie } from '../../../models/Movie';

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
      console.log('searchMovies');
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

  public setRatingFilter(val: number): void {
    this.ratingFilter.next(val);
  }

  public getRandomMovie() {
    this.service.getMovies().subscribe((res: Movie[]) => {
      this.randomMovie.next(res[Math.floor(Math.random() * res.length)]);
    });
  }
}
