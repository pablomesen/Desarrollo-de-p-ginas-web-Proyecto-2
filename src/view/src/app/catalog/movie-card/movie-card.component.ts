// movie-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Movie {
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow-custom border rounded-xl overflow-hidden">
      <img [src]="movie.imageUrl" [alt]="movie.title" class="w-full h-72 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-bold text-teal-custom truncate">{{ movie.title }}</h3>
      </div>
    </div>
  `
})
export class MovieCardComponent {
  @Input() movie!: Movie;
}