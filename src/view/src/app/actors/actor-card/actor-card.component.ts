import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IActor } from '../../../../../models/Actor';
import { ActorService } from '../../services/actor.service';
import { MovieDetailsDialogComponent } from '../../catalog/movie-details-dialog/movie-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-actor-card',
  standalone: true,
  templateUrl: './actor-card.component.html',
  imports: [CommonModule],
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ActorCardComponent {
  @Input() actor!: IActor;
  @Output() actorDeleted = new EventEmitter<string>();

  private router = inject(Router);
  private actorService = inject(ActorService);

  currentImageIndex = 0;
  showDeleteConfirmation = false;
  deleteError = '';

  placeholderImage: string = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U2ZTZlNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaW4gaW1hZ2VuPC90ZXh0Pjwvc3ZnPg==';

  constructor (
      private dialog: MatDialog
    ) { }

  hasMultipleImages(): boolean {
    return Array.isArray(this.actor.images) && this.actor.images.length > 1;
  }

  getImagesLength(): number {
    return this.actor.images?.length || 0;
  }

  getCurrentImageUrl(): string {
    if (!this.actor.images || !Array.isArray(this.actor.images) || this.actor.images.length === 0) {
      return this.placeholderImage;
    }

    const currentImage = this.actor.images[this.currentImageIndex];

    if (!currentImage || typeof currentImage !== 'string') {
      return this.placeholderImage;
    }

    try {
      new URL(currentImage);
      return currentImage;
    } catch {
      return currentImage.startsWith('/') ? currentImage : `/${currentImage}`;
    }
  }

  truncateText(text: string, limit: number): string {
    if (!text) {
      return '';
    }
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  handleImageError(event: any): void {
    event.target.src = this.placeholderImage;
  }

  previousImage(event: Event): void {
    event.stopPropagation();
    if (!this.hasMultipleImages()) return;

    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.getImagesLength() - 1;
    }
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    if (!this.hasMultipleImages()) return;

    if (this.currentImageIndex < this.getImagesLength() - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

  viewMore(): void {
    this.router.navigate(['/actor', this.actor.id]);
  }

  onDeleteClick(event: Event): void {
    event.stopPropagation();
    this.showDeleteConfirmation = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
    this.deleteError = '';
  }

  handleDelete(): void {
    console.log("Iniciando eliminación del actor:", this.actor);

    const mongoId = (this.actor as any)._id;

    if (!mongoId) {
        console.error('No hay ID de actor válido');
        this.deleteError = 'ID de actor no válido';
        return;
    }

    this.actorService.deleteActor(mongoId).subscribe({
        next: () => {
            console.log('Actor eliminado exitosamente');
            this.showDeleteConfirmation = false;
            this.actorDeleted.emit(mongoId);
        },
        error: (error) => {
            console.error('Error al eliminar actor:', error);

            if (error.status === 404) {
                console.log('Actor no encontrado, posiblemente ya eliminado');
                this.showDeleteConfirmation = false;
                this.actorDeleted.emit(mongoId);
                return;
            }

            this.deleteError = error.message || 'Error al eliminar el actor';
        }
    });
  }

  // Calling the details dialog method
    onDetails(): void {
      if (!this.actor) { return }
  
      const formatedData = {
        // "Shared" properties with movie
        isMovie: false,
        title1: this.actor.name,
        title2: this.actor.lastName,
        description: this.actor.biography,
        date: this.actor.birthDate,
        images: this.actor.images,
  
        // Exlcusive actor properties
        movies: this.actor.movies 
      }
  
      const dialogRef = this.dialog.open( MovieDetailsDialogComponent, {
        data: formatedData,
        width: '40vw',
        height: '61vh',
        maxWidth: '95vw',
        maxHeight: '95vh'
      });
    }
}
