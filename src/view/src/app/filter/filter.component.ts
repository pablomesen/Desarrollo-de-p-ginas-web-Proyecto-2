// filter.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter.component.html', // Referencia al archivo HTML externo
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