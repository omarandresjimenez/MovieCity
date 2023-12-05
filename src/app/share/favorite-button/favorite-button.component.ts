import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.scss',
})
export class FavoriteButtonComponent {
  @Input({ required: true })
  movieId!: string;

  isFavorite: boolean = false;

  favIcon = this.isFavorite ? faHeart : faEmptyHeart;

  toggleFavorites() {
    console.log('Favorite button clicked');
  }
}
