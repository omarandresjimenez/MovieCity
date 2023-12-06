import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';
import { MovieFavorite } from '../../models/types';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.scss',
})
export class FavoriteButtonComponent implements OnInit {
  @Input({ required: true })
  movie!: Movie;

  @Output()
  setFavorite = new EventEmitter<MovieFavorite>();
  favIcon = faEmptyHeart;

  ngOnInit(): void {
    this.setFavIcon();
  }

  toggleFavorites() {
    this.setFavorite.emit({
      favorite: !this.movie.isFavorite,
      movieId: this.movie.id,
    });
    this.setFavIcon();
  }

  private setFavIcon() {
    this.favIcon = this.movie.isFavorite ? faHeart : faEmptyHeart;
  }
}
