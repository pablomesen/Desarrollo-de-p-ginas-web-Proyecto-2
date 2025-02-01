import { Component, Input } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent {
  @Input() movies: any[] = [];

  constructor(private router: Router) {}

  editMovie(movie: any) {
    console.log('Evento recibido en MovieListComponent:', movie);
    if (movie && movie._id) {
      this.router.navigate(['/movies/edit', movie._id]);
    } else {
      console.error('Error: Movie ID is missing');
    }
  }
  
}
