import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MovieFavorite } from '../../../../models/types';
import { Movie } from '../../../../models/Movie';
import { PlayButtonComponent } from '../../../../share/play-button/play-button.component';
import { FavoriteButtonComponent } from '../../../../share/favorite-button/favorite-button.component';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    PlayButtonComponent,
    FavoriteButtonComponent,
  ],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss',
})
export class InfoModalComponent {
  @Input({ required: true }) movie!: Movie;
  @Input() isVisible = false;
  @Output() setFavorite = new EventEmitter<MovieFavorite>();
  @Output() setClose = new EventEmitter();

  faIcon = faXmark;

  handleClose() {
    this.setClose.emit();
  }

  onSetFavorite(event: MovieFavorite): void {
    this.setFavorite.emit(event);
  }
}
