import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../../models/Movie';
import { MovieCardComponent } from '../movie-card/movie.component';
import { MovieFavorite } from '../../../../models/types';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  imports: [CommonModule, MovieCardComponent],
})
export class MovieListComponent {
  @Input({ required: true }) movies: Movie[] = [];
  @Input() title: string = '';
  @Output() movieSelected = new EventEmitter<Movie>();
  @Output() setFavorite = new EventEmitter<MovieFavorite>();

  onMovieSelected(movie: Movie): void {
    this.movieSelected.emit(movie);
  }

  onSetFavorite(event: MovieFavorite): void {
    this.setFavorite.emit(event);
  }
}
