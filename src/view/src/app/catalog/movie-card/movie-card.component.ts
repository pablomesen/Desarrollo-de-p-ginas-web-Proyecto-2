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
  @Input() movie: any; 
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
    const dialogRef = this.dialog.open( MovieDetailsDialogComponent, {
      data: this.movie,
      width: '65vw',
      height: '72vh',
      maxWidth: '95vw',
      maxHeight: '95vh'
    });
  }
}
