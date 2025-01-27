import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-area',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="mb-4 flex">
      <input 
        type="text" 
        [(ngModel)]="searchQuery"
        (keyup.enter)="search()"
        placeholder="Buscar películas..."
        class="w-full p-2 border rounded-xl border-teal-light focus:outline-none focus:ring-2 focus:ring-teal-custom"
      >
      <button 
        (click)="search()" 
        class="ml-2 px-4 py-2 bg-teal-custom text-white rounded-xl hover:bg-teal-dark"
      >
        Buscar
      </button>
    </div>
  `
})
export class SearchAreaComponent {
  searchQuery = '';
  @Output() searchMovies = new EventEmitter<string>();

  search() {
    this.searchMovies.emit(this.searchQuery);
  }
}
