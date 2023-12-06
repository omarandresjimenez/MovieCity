import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private router: Router = inject(Router);
  @Input({ required: true })
  movieId!: string;

  faPlayIcon = faPlay;
  handleClickPlay() {
    this.router.navigateByUrl(`/watch/${this.movieId}`);
  }
}
