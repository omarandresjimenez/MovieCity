import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../../../share/search-bar/search-bar.component';
import { MovieCatalogService } from '../../service/movies.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  imports: [CommonModule, RouterModule, SearchBarComponent],
})
export class NavBarComponent {
  constructor(
    private movieService: MovieCatalogService,
    private router: Router
  ) {}

  navItems = [
    {
      title: 'Home',
      url: '/home',
      active: true,
    },
    {
      title: 'Movies',
      url: '/movies',
      active: false,
    },
    {
      title: 'TV Shows',
      url: '/tv-shows',
      active: false,
    },
    {
      title: 'My List',
      url: '/my-list',
      active: false,
    },
  ];

  onSearch(text: string) {
    this.router.navigateByUrl('/home?search=' + text);
    this.movieService.searchMovies(text);
  }
}
