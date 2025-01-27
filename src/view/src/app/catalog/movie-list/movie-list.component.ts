import { Component, Input } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <app-movie-card 
        *ngFor="let movie of movies" 
        [movie]="movie"
      ></app-movie-card>
    </div>
  `
})
export class MovieListComponent {
  @Input() movies: any[] = [];
}