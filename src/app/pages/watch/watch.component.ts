import { Component, Input, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../models/Movie';
import { Router } from '@angular/router';
import { MovieCatalogService } from '../billboard/service/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss',
})
export class WatchComponent implements OnInit {
  @Input('movieId') movieId!: string;

  private movieService: MovieCatalogService = inject(MovieCatalogService);
  private router: Router = inject(Router);
  movie$: Observable<Movie> = new Observable<Movie>();

  ngOnInit(): void {
    this.movie$ = this.movieService.getMovie(this.movieId);
  }

  faIcon = faCircleArrowLeft;

  goBack() {
    this.router.navigate(['/']);
  }
}
