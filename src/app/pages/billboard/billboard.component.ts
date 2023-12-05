import { Component, OnInit, Input, inject, DestroyRef } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Movie } from '../../models/Movie';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlayButtonComponent } from '../../share/play-button/play-button.component';
import { MovieCatalogService } from './service/movies.service';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './components/movie-list/movie-list.component';

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
  ],
})
export class BillboardComponent implements OnInit {
  constructor(private movieService: MovieCatalogService) {}
  movies: Movie[] = [];
  movie: Movie | null = null;
  faInfoIcon = faCircleInfo;
  movies$: Observable<Movie[]> = this.movieService.movieCatalog$;
  movie$: Observable<Movie | null> = this.movieService.randomMovie$;

  private destroyRef = inject(DestroyRef);

  @Input('favorites') favorites?: boolean = false;

  ngOnInit(): void {
    this.movieService.searchMovies('');
    this.movieService.getRandomMovie();
    this.movies$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies) => {
        this.movies = movies;
      });
    this.movie$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movie: Movie | null) => {
        this.movie = movie;
      });
  }

  handleOpenModal() {
    console.log('Open modal');
  }

  onMovieSelected(movie: Movie): void {
    this.movie = movie;
  }
}
