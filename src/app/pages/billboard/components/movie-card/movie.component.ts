import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlayButtonComponent } from '../../../../share/play-button/play-button.component';
import { FavoriteButtonComponent } from '../../../../share/favorite-button/favorite-button.component';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../../../models/Movie';

@Component({
  selector: 'app-movie',
  standalone: true,
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  imports: [
    CommonModule,
    PlayButtonComponent,
    FavoriteButtonComponent,
    FontAwesomeModule,
  ],
})
export class MovieCardComponent {
  faIconView = faEye;

  @Input({ required: true }) movie?: Movie;
  @Output() movieSelected = new EventEmitter<Movie>();

  openModal(): void {
    console.log('Open modal');
  }

  redirectToWatch(): void {
    this.movieSelected.emit(this.movie);
  }
}
