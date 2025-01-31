import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-area',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-area.component.html', // Referencia al archivo HTML
})
export class SearchAreaComponent {
  searchQuery = '';
  @Output() searchMovies = new EventEmitter<string>();

  search() {
    this.searchMovies.emit(this.searchQuery);
  }
}