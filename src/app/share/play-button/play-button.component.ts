import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss',
})
export class PlayButtonComponent {
  @Input({ required: true })
  movieId!: string;

  faPlayIcon = faPlay;
  handleClickPlay() {
    console.log('Play button clicked');
  }
}
