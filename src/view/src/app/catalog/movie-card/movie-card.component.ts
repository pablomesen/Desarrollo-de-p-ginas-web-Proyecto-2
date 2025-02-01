import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from '../../../../../models/Movie';

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
  @Output() onEdit = new EventEmitter<any>();  // Evento de edición

  handleImageError(event: any): void {
    event.target.src = 'assets/placeholder.jpg';
  }
}
