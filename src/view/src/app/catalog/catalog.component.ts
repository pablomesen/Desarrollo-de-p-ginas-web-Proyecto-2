import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SearchAreaComponent } from './search-area/search-area.component';
import { FilterComponent } from '../filter/filter.component';
import { IMovie } from '../../../../models/Movie';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MovieCardComponent,
    SearchAreaComponent,
    FilterComponent
  ],
  template: `
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Filters Sidebar -->
        <div class="md:col-span-1">
          <app-filter (filterChange)="onFilterChange($event)"></app-filter>
        </div>
        
        <!-- Main Content -->
        <div class="md:col-span-3">
          <app-search-area (searchMovies)="onSearchMovies($event)"></app-search-area>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <app-movie-card
              *ngFor="let movie of paginatedMovies"
              [movie]="movie"
            ></app-movie-card>
          </div>

          <div class="flex justify-center mt-6">
            <button
              *ngIf="currentPage > 1"
              (click)="previousPage()"
              class="mx-2 px-4 py-2 bg-teal-custom text-white rounded-xl"
            >
              Anterior
            </button>
            <span class="mx-4">Página {{ currentPage }} de {{ totalPages }}</span>
            <button
              *ngIf="currentPage < totalPages"
              (click)="nextPage()"
              class="mx-2 px-4 py-2 bg-teal-custom text-white rounded-xl"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CatalogComponent implements OnInit {
  movies: IMovie[] = [];
  filteredMovies: IMovie[] = [];
  currentPage = 1;
  moviesPerPage = 12;
  searchQuery = '';
  activeFilters: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.http.get<IMovie[]>('http://localhost:3000/api/getMovies').subscribe(
      (data) => {
        this.movies = data;
        this.applyFiltersAndSearch();
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  onFilterChange(filters: any) {
    this.activeFilters = filters;
    this.applyFiltersAndSearch();
  }

  onSearchMovies(query: string) {
    this.searchQuery = query;
    this.applyFiltersAndSearch();
  }

  applyFiltersAndSearch() {
    let results = [...this.movies];

    // Apply search
    if (this.searchQuery) {
      results = results.filter(movie =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (this.activeFilters.genre) {
      results = results.filter(movie => 
        movie.genres.includes(this.activeFilters.genre)
      );
    }

    if (this.activeFilters.cast) {
      results = results.filter(movie => 
        movie.cast.some(actor => 
          actor.toLowerCase().includes(this.activeFilters.cast.toLowerCase())
        )
      );
    }

    if (this.activeFilters.director) {
      results = results.filter(movie => 
        movie.director.toLowerCase().includes(this.activeFilters.director.toLowerCase())
      );
    }

    if (this.activeFilters.dateFrom) {
      results = results.filter(movie => 
        new Date(movie.releaseDate) >= this.activeFilters.dateFrom
      );
    }

    if (this.activeFilters.dateTo) {
      results = results.filter(movie => 
        new Date(movie.releaseDate) <= this.activeFilters.dateTo
      );
    }

    if (this.activeFilters.minCalification) {
      results = results.filter(movie => 
        movie.calification >= this.activeFilters.minCalification
      );
    }

    // Apply sorting
    if (this.activeFilters.sortBy) {
      results.sort((a, b) => {
        switch (this.activeFilters.sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'releaseDate':
            return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
          case 'calification':
            return b.calification - a.calification;
          case 'director':
            return a.director.localeCompare(b.director);
          default:
            return 0;
        }
      });
    }

    this.filteredMovies = results;
    this.currentPage = 1;
  }

  get paginatedMovies(): IMovie[] {
    const startIndex = (this.currentPage - 1) * this.moviesPerPage;
    return this.filteredMovies.slice(startIndex, startIndex + this.moviesPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredMovies.length / this.moviesPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
