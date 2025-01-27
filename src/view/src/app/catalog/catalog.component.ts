// catalog.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SearchAreaComponent } from './search-area/search-area.component';
import { HttpClient } from '@angular/common/http';

interface Movie {
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule, 
    MovieCardComponent, 
    SearchAreaComponent
  ],
  template: `
    <div class="container mx-auto p-4">
      <app-search-area (searchMovies)="onSearchMovies($event)"></app-search-area>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
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
          Previous
        </button>
        <span class="mx-4">Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          *ngIf="currentPage < totalPages" 
          (click)="nextPage()"
          class="mx-2 px-4 py-2 bg-teal-custom text-white rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  `
})
export class CatalogComponent implements OnInit {
  movies: Movie[] = [
    {
      "title": "The Shawshank Redemption",
      "imageUrl": "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg"
    },
    {
      "title": "The Godfather",
      "imageUrl": "https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg"
    },
    {
      "title": "The Dark Knight",
      "imageUrl": "https://m.media-amazon.com/images/I/51k0qaHDxrL._AC_SY679_.jpg"
    },
    {
      "title": "Pulp Fiction",
      "imageUrl": "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg"
    },
    {
      "title": "Forrest Gump",
      "imageUrl": "https://m.media-amazon.com/images/I/61Y9RfdZX7L._AC_SY679_.jpg"
    },
    {
      "title": "Inception",
      "imageUrl": "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg"
    },
    {
      "title": "Fight Club",
      "imageUrl": "https://m.media-amazon.com/images/I/81D+KJkO7-L._AC_SY679_.jpg"
    },
    {
      "title": "The Matrix",
      "imageUrl": "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg"
    },
    {
      "title": "The Lord of the Rings: The Fellowship of the Ring",
      "imageUrl": "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_SY679_.jpg"
    },
    {
      "title": "The Lion King",
      "imageUrl": "https://m.media-amazon.com/images/I/71dDQKMWMSL._AC_SY679_.jpg"
    },
    {
      "title": "Interstellar",
      "imageUrl": "https://m.media-amazon.com/images/I/81mTWneAwBL._AC_SY679_.jpg"
    },
    {
      "title": "Gladiator",
      "imageUrl": "https://m.media-amazon.com/images/I/61+jlcHkLmL._AC_SY679_.jpg"
    },
    {
      "title": "Saving Private Ryan",
      "imageUrl": "https://m.media-amazon.com/images/I/51mfD3VzxIL._AC_SY679_.jpg"
    },
    {
      "title": "The Green Mile",
      "imageUrl": "https://m.media-amazon.com/images/I/51snSMqRBFL._AC_SY679_.jpg"
    },
    {
      "title": "Schindler's List",
      "imageUrl": "https://m.media-amazon.com/images/I/51AfIvd4fhL._AC_.jpg"
    },
    {
      "title": "Braveheart",
      "imageUrl": "https://m.media-amazon.com/images/I/51NTtBGieBL._AC_SY679_.jpg"
    },
    {
      "title": "Avengers: Endgame",
      "imageUrl": "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg"
    },
    {
      "title": "Titanic",
      "imageUrl": "https://m.media-amazon.com/images/I/71rNJQ2g-EL._AC_SY679_.jpg"
    },
    {
      "title": "Jurassic Park",
      "imageUrl": "https://m.media-amazon.com/images/I/81xTXuRzy8L._AC_SY679_.jpg"
    },
    {
      "title": "Star Wars: Episode IV - A New Hope",
      "imageUrl": "https://m.media-amazon.com/images/I/71ikfZZT9bL._AC_SY679_.jpg"
    },
    {
      "title": "The Empire Strikes Back",
      "imageUrl": "https://m.media-amazon.com/images/I/81MXA1xjF9L._AC_SY679_.jpg"
    },
    {
      "title": "Return of the Jedi",
      "imageUrl": "https://m.media-amazon.com/images/I/81Kndw8JBvL._AC_SY679_.jpg"
    },
    {
      "title": "The Avengers",
      "imageUrl": "https://m.media-amazon.com/images/I/91pYkYPnKLL._AC_SY679_.jpg"
    },
    {
      "title": "Black Panther",
      "imageUrl": "https://m.media-amazon.com/images/I/91krzNd6nGL._AC_SY679_.jpg"
    },
    {
      "title": "Spider-Man: No Way Home",
      "imageUrl": "https://m.media-amazon.com/images/I/81QpGzg9f4L._AC_SY679_.jpg"
    },
    {
      "title": "Coco",
      "imageUrl": "https://m.media-amazon.com/images/I/71QKGmjslXL._AC_SY679_.jpg"
    },
    {
      "title": "Up",
      "imageUrl": "https://m.media-amazon.com/images/I/81zZhdX9bOL._AC_SY679_.jpg"
    },
    {
      "title": "Toy Story",
      "imageUrl": "https://m.media-amazon.com/images/I/91DBniIGTPL._AC_SY679_.jpg"
    },
    {
      "title": "Frozen",
      "imageUrl": "https://m.media-amazon.com/images/I/81cMO-OrrKL._AC_SY679_.jpg"
    },
    {
      "title": "Finding Nemo",
      "imageUrl": "https://m.media-amazon.com/images/I/81lRzYZjlLL._AC_SY679_.jpg"
    }
  ];
  
  filteredMovies: Movie[] = [];
  currentPage = 1;
  moviesPerPage = 12;

  ngOnInit() {
    this.filteredMovies = this.movies;
  }

  get paginatedMovies(): Movie[] {
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

  onSearchMovies(query: string) {
    this.filteredMovies = this.movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    this.currentPage = 1;
  }
}