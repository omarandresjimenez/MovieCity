import { Component, OnInit, Input, inject, DestroyRef } from '@angular/core';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Movie } from '../../models/Movie';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlayButtonComponent } from '../../share/play-button/play-button.component';
import { MovieCatalogService } from './service/movies.service';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFavorite } from '../../models/types';
import { InfoModalComponent } from './components/info-modal/info-modal.component';

@Component({
  selector: 'app-billboard',
  standalone: true,
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.scss',
  imports: [
    FontAwesomeModule,
    PlayButtonComponent,
    CommonModule,
    MovieListComponent,
    InfoModalComponent,
  ],
})
export class BillboardComponent implements OnInit {
  constructor(private movieService: MovieCatalogService) {}
  movies: Movie[] = [];
  favoriteMovies: Movie[] = [];
  movie: Movie | null = null;
  faInfoIcon = faCircleInfo;
  title = 'Popular Movies';
  showModal = false;
  movies$: Observable<Movie[]> = this.movieService.movieCatalog$;
  movie$: Observable<Movie | null> = this.movieService.randomMovie$;
  favitesMovies$: Observable<Movie[]> = this.movieService.favorites$;

  private destroyRef = inject(DestroyRef);

  @Input('favorites') favorites?: boolean = false;
  @Input('search') search?: string = '';

  ngOnInit(): void {
    this.movieService.getFavoriteMovies();
    this.movieService.getRandomMovie();
    this.movieService.searchMovies('');
    combineLatest([this.favitesMovies$, this.movies$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([favorites, movies]) => {
        this.movies = movies;
        this.favoriteMovies = favorites;
      });
  }

  handleOpenModal(close: boolean) {
    this.showModal = close;
  }

  onMovieSelected(movie: Movie): void {
    this.movie = movie;
  }

  onSetFavorite(event: MovieFavorite): void {
    if (event.favorite) {
      this.movieService.addMovieToFavorites(event.movieId);
    } else {
      this.movieService.removeMovieFromFavorites(event.movieId);
    }
    // this.movieService.getFavoriteMovies();
  }
}
