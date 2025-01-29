import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="bg-white p-4 rounded-xl shadow-sm mb-4">
      <h3 class="text-lg font-bold text-teal-custom mb-3">Filtros</h3>
      
      <div class="space-y-4">
        <!-- Genres Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Género</label>
          <select 
            [(ngModel)]="selectedGenre"
            (ngModelChange)="applyFilters()"
            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-custom"
          >
            <option value="">Todos los géneros</option>
            <option *ngFor="let genre of genres" [value]="genre">{{ genre }}</option>
          </select>
        </div>

        <!-- Cast Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Buscar por Actor</label>
          <input 
            type="text"
            [(ngModel)]="castSearch"
            (ngModelChange)="applyFilters()"
            placeholder="Nombre del actor..."
            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-custom"
          >
        </div>

        <!-- Director Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Director</label>
          <input 
            type="text"
            [(ngModel)]="directorSearch"
            (ngModelChange)="applyFilters()"
            placeholder="Nombre del director..."
            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-custom"
          >
        </div>

        <!-- Date Range Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de Estreno</label>
          <div class="flex gap-2">
            <input 
              type="date"
              [(ngModel)]="dateFrom"
              (ngModelChange)="applyFilters()"
              class="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-teal-custom"
            >
            <input 
              type="date"
              [(ngModel)]="dateTo"
              (ngModelChange)="applyFilters()"
              class="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-teal-custom"
            >
          </div>
        </div>

        <!-- Calification Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Calificación Mínima</label>
          <input 
            type="range"
            [(ngModel)]="minCalification"
            (ngModelChange)="applyFilters()"
            min="0"
            max="10"
            step="0.5"
            class="w-full"
          >
          <div class="text-sm text-gray-600 text-center">{{ minCalification }} / 10</div>
        </div>

        <!-- Sort Order -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ordenar Por</label>
          <select 
            [(ngModel)]="sortBy"
            (ngModelChange)="applyFilters()"
            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-custom"
          >
            <option value="title">Título</option>
            <option value="releaseDate">Fecha de Estreno</option>
            <option value="calification">Calificación</option>
            <option value="director">Director</option>
          </select>
        </div>
      </div>
    </div>
  `
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<any>();

  genres = ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Documentary'];
  selectedGenre = '';
  castSearch = '';
  directorSearch = '';
  dateFrom?: string;
  dateTo?: string;
  minCalification = 0;
  sortBy = 'title';

  applyFilters() {
    this.filterChange.emit({
      genre: this.selectedGenre,
      cast: this.castSearch,
      director: this.directorSearch,
      dateFrom: this.dateFrom ? new Date(this.dateFrom) : null,
      dateTo: this.dateTo ? new Date(this.dateTo) : null,
      minCalification: this.minCalification,
      sortBy: this.sortBy
    });
  }
}