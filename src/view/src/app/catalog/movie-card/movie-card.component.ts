import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from '../../../../../models/Movie';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: IMovie;
  isAdmin = false;
  @Output() onViewDetails = new EventEmitter<IMovie>();
  @Output() onDelete = new EventEmitter<IMovie>();
  @Output() onEdit = new EventEmitter<IMovie>();

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.isAdmin = user.role === 'admin';
      }
    });
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/placeholder.jpg';
  }

  editMovie() {
    if (!this.isAdmin) return;
    this.onEdit.emit(this.movie);
  }

  deleteMovie() {
    if (this.isAdmin) {
      this.onDelete.emit(this.movie);
    }
  }

  onDetails(): void {
    if (!this.movie) return;

    const formatedData = {
      isMovie: true,
      title1: this.movie.title,
      title2: "Dirigida por: " + this.movie.director,
      description: this.movie.description,
      date: this.movie.releaseDate,
      images: this.movie.images,
      calification: this.movie.calification,
      genres: this.movie.genres,
      cast: this.movie.cast
    };

    this.dialog.open(MovieDetailsDialogComponent, {
      data: formatedData,
      width: '65vw',
      height: '72vh',
      maxWidth: '95vw',
      maxHeight: '95vh'
    });
  }
}
