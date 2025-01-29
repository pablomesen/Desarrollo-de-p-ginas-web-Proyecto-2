// movie-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from '../../../../../models/Movie';
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow-custom border rounded-xl overflow-hidden">
      <!-- Image Carousel -->
      <div class="relative h-72 group">
        <!-- Current Image -->
        <img 
          [src]="movie.images[currentImageIndex]" 
          [alt]="movie.title"
          class="w-full h-72 object-cover transition-all duration-300"
          (error)="handleImageError($event)"
        >

        <!-- Carousel Controls -->
        <div 
          *ngIf="movie.images.length > 1"
          class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <!-- Navigation Arrows -->
          <div class="absolute inset-0 flex items-center justify-between px-2">
            <button 
              (click)="previousImage($event)"
              class="w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transform transition hover:scale-110"
            >
              ←
            </button>
            <button 
              (click)="nextImage($event)"
              class="w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transform transition hover:scale-110"
            >
              →
            </button>
          </div>

          <!-- Dots Indicator -->
          <div class="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            <button 
              *ngFor="let image of movie.images; let i = index"
              (click)="goToImage(i, $event)"
              class="w-2 h-2 rounded-full transition-all duration-300"
              [class]="i === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'"
            ></button>
          </div>
        </div>

        <!-- Image Counter -->
        <div 
          *ngIf="movie.images.length > 1"
          class="absolute top-2 right-2 px-2 py-1 rounded bg-black bg-opacity-50 text-white text-xs"
        >
          {{ currentImageIndex + 1 }}/{{ movie.images.length }}
        </div>
      </div>

      <!-- Movie Info -->
      <div class="p-4">
        <h3 class="text-lg font-bold text-teal-custom truncate">{{ movie.title }}</h3>
        <p class="text-sm text-gray-600 line-clamp-2">{{ movie.description }}</p>
        <p class="text-sm text-gray-600 mt-1">{{ movie.director }}</p>
        <div class="flex items-center mt-2">
          <span class="text-yellow-500">★</span>
          <span class="ml-1">{{ movie.calification }}/10</span>
        </div>
        <div class="mt-2 flex flex-wrap gap-1">
          <span 
            *ngFor="let genre of movie.genres" 
            class="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full"
          >
            {{ genre }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: IMovie;
  currentImageIndex = 0;
  autoplayInterval: any;

  ngOnInit() {
    // Opcional: Iniciar autoplay
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  nextImage(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      this.stopAutoplay();
    }
    
    this.currentImageIndex = (this.currentImageIndex + 1) % this.movie.images.length;
  }

  previousImage(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      this.stopAutoplay();
    }
    
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.movie.images.length - 1 
      : this.currentImageIndex - 1;
  }

  goToImage(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.stopAutoplay();
    this.currentImageIndex = index;
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/placeholder.jpg'; // Asegúrate de tener una imagen placeholder
  }

  startAutoplay(): void {
    if (this.movie.images.length > 1) {
      this.autoplayInterval = setInterval(() => {
        this.nextImage();
      }, 5000); // Cambia imagen cada 5 segundos
    }
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
}