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
    // Redirige al formulario de edición usando el _id de MongoDB
    console.log("Xd")
    this.router.navigate(['/movies/edit', movie._id]);
  }
}
