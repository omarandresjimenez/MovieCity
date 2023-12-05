import { TestBed } from '@angular/core/testing';

import { MoviesServiceService } from './movies.service';

describe('MoviesServiceService', () => {
  let service: MoviesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
