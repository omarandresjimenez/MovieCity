import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../../models/Movie';
import { MovieCardComponent } from '../movie-card/movie.component';

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

  onMovieSelected(movie: Movie): void {
    this.movieSelected.emit(movie);
  }
}
