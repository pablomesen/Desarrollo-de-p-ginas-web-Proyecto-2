import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IActor } from '../../../../../models/Actor';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-actor-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-card.component.html',
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

  // Base64 encoded placeholder image
  placeholderImage: string = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U2ZTZlNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaW4gaW1hZ2VuPC90ZXh0Pjwvc3ZnPg==';

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
    console.log("entre")
    if (!this.actor || !this.actor.id) {
      this.deleteError = 'ID de actor no válido';
      return;
    }
  
    this.actorService.deleteActor(this.actor.id).subscribe({
      next: (response) => {
        console.log('Respuesta exitosa:', response);
        this.showDeleteConfirmation = false;
        this.actorDeleted.emit(this.actor.id);
      },
      error: (error) => {
        console.error('Error completo al eliminar:', error);
        this.deleteError = error.error?.message || error.message || 'Error al eliminar el actor';
        
        // Si el error es 404, podemos asumir que el actor ya fue eliminado
        if (error.status === 404) {
          this.showDeleteConfirmation = false;
          this.actorDeleted.emit(this.actor.id);
        }
        
        // Si es un error 500, mostramos más información
        if (error.status === 500) {
          console.log('ID del actor que causó el error:', this.actor.id);
          console.log('Error completo del servidor:', error.error);
        }
      },
      complete: () => {
        console.log('Operación de eliminación completada');
      }
    });
  }
}