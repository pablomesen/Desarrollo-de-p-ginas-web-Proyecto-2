import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from '../../../../../models/Movie';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {
  @Input() movie!: IMovie; // Estaba tipado como "any", lo cambie a "IMovie" 
  @Input() isAdmin = true; //ESTO VA FALSE
  @Output() onViewDetails = new EventEmitter<IMovie>();
  @Output() onDelete = new EventEmitter<IMovie>();
  @Output() onEdit = new EventEmitter<IMovie>();

  constructor (
    private dialog: MatDialog
  ) { }

  handleImageError(event: any): void {
    event.target.src = 'assets/placeholder.jpg';
  }

  editMovie() {
    console.log('Emitir evento de edición:', this.movie);
    this.onEdit.emit(this.movie);  // Emite la película seleccionada
  }

  // Calling the details dialog method
  onDetails(): void {
    if (!this.movie) { return }

    const formatedData = {
      // "Shared" properties with actor
      isMovie: true,
      title1: this.movie.title,
      title2: "Dirigida por: " + this.movie.director,
      description: this.movie.description,
      date: this.movie.releaseDate,
      images: this.movie.images,

      // Exlcusive movie properties
      calification: this.movie.calification,
      genres: this.movie.genres,
      cast: this.movie.cast
    }

    const dialogRef = this.dialog.open( MovieDetailsDialogComponent, {
      data: formatedData,
      width: '65vw',
      height: '72vh',
      maxWidth: '95vw',
      maxHeight: '95vh'
    });
  }
}