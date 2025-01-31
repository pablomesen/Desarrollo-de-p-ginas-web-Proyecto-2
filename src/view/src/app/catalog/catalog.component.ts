import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SearchAreaComponent } from './search-area/search-area.component';
import { FilterComponent } from '../filter/filter.component';
import { IMovie } from '../../../../models/Movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MovieCardComponent,
    SearchAreaComponent,
    FilterComponent
  ],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
  movies: IMovie[] = [];
  filteredMovies: IMovie[] = [];
  currentPage = 1;
  moviesPerPage = 12;
  searchQuery = '';
  activeFilters: any = {};

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.applyFiltersAndSearch();
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  deleteMovie(movie: IMovie) {
    if (confirm(`¿Estás seguro de que deseas eliminar "${movie.title}"?`)) {
      const index = this.movies.findIndex(m => m === movie);
      if (index !== -1) {
        this.movieService.deleteMovie(movie._id).subscribe({
          next: (response) => {
            this.movies.splice(index, 1);
            this.applyFiltersAndSearch();
            alert(response.message || 'Película eliminada con éxito');
          },
          error: (error) => {
            console.error('Error al eliminar la película:', error);
            if (error.status === 404) {
              alert('No se encontró la película');
            } else {
              alert('Ha ocurrido un error al eliminar la película');
            }
          }
        });
      }
    }
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

    if (this.searchQuery) {
      results = results.filter(movie =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

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