// movie-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IActor } from '../../../../../models/Actor';
import { IMovie } from '../../../../../models/Movie';
import { MovieService } from '../../services/movie.service';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})



export class MovieFormComponent {

  public formMode: 'add' | 'edit' = 'add';
  movieForm: FormGroup;
  castInput = new FormControl('');
  genreInput = new FormControl('');
  
  allActors : string[] = []; // Replace the hardcoded array with this
  
  allGenres = [
    'Action', 'Comedy', 'Drama', 'Fantasy', 
    'Horror', 'Mystery', 'Romance', 'Thriller',
    'Sci-Fi', 'Western', 'Animation', 'Adventure',
    'Crime', 'Documentary', 'Family', 'History'
  ];

  filteredActors: Observable<string[]>;
  filteredGenres: Observable<string[]>;

  constructor( 
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private movieService: MovieService,
    private actorService: ActorService,
    private activatedRoute: ActivatedRoute,
    private router: Router   
  ) {
    
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      director: ['', Validators.required],
      cast: this.fb.array([], Validators.required),
      genres: this.fb.array([], Validators.required),
      calification: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      releaseDate: ['', Validators.required],
      images: this.fb.array([this.fb.control('', Validators.required)])
    });

    this.filteredActors = this.castInput.valueChanges.pipe(
      startWith(''),
      map(value => this._filterActors(value || ''))
    );

    this.filteredGenres = this.genreInput.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGenres(value || ''))
    );
  }


  get currentMovie(): IMovie {
    const movie = this.movieForm.value as IMovie;
    return movie;
  }

  private _filterActors(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allActors.filter(fullName =>
      fullName.toLowerCase().includes(filterValue)
    );
  }

  private _filterGenres(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allGenres.filter(genre => 
      genre.toLowerCase().includes(filterValue)
    );
  }
  
  // Form array getters
  get cast() {
    return this.movieForm.get('cast') as FormArray;
  }

  get genres() {
    return this.movieForm.get('genres') as FormArray;
  }

  get images() {
    return this.movieForm.get('images') as FormArray;
  }

  // Cast methods
  addCastFromInput() {
    const value = this.castInput.value?.trim(); // Safe access using optional chaining
  
    if (!value) {
      this.snackBar.open('Please enter an actor name.', 'Close', { duration: 3000 });
      return; // Exit early if no value is provided
    }
  
    // Check if the actor is in the allActors array
    if (this.allActors.includes(value)) {
      // Check if the actor is already in the cast array
      const isDuplicate = this.cast.controls.some(
        control => control.value.toLowerCase() === value.toLowerCase()
      );
  
      if (isDuplicate) {
        this.snackBar.open('This actor is already added.', 'Close', { duration: 3000 });
      } else {
        this.cast.push(this.fb.control(value)); // Add the full name as a string
        this.castInput.setValue('');
      }
    } else {
      this.snackBar.open('Actor not found in the database.', 'Close', { duration: 3000 });
    }
  }



  onCastOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedActorName = event.option.value;

    // Check if the actor is already in the cast array
    const isDuplicate = this.cast.controls.some(
      control => control.value.toLowerCase() === selectedActorName.toLowerCase()
    );

    if (isDuplicate) {
      this.snackBar.open('This actor is already added.', 'Close', { duration: 3000 });
    } else {
      this.cast.push(this.fb.control(selectedActorName)); // Add the full name as a string
      this.castInput.setValue('');
    }
  }

  removeCast(index: number) {
    this.cast.removeAt(index);
  }

  // Genre methods
  addGenreFromInput() {
    const value = this.genreInput.value?.trim();

    if (!value) {
      this.snackBar.open('Please enter a genre.', 'Close', { duration: 3000 });
      return; // Exit early if no value is provided
    }
  
    // Check if the genre is already in the genres array
    const isDuplicate = this.genres.controls.some(
      control => control.value.toLowerCase() === value.toLowerCase()
    );
  
    if (isDuplicate) {
      this.snackBar.open('This genre is already added.', 'Close', { duration: 3000 });
    } else {
      this.genres.push(this.fb.control(value)); // Add the genre as a string
      this.genreInput.setValue('');
    }
  }

  onGenreOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedGenre = event.option.value;

    // Check if the genre is already in the genres array
    const isDuplicate = this.genres.controls.some(
      control => control.value.toLowerCase() === selectedGenre.toLowerCase()
    );
  
    if (isDuplicate) {
      this.snackBar.open('This genre is already added.', 'Close', { duration: 3000 });
    } else {
      this.genres.push(this.fb.control(selectedGenre)); // Add the genre as a string
      this.genreInput.setValue('');
    }
  }

  removeGenre(index: number) {
    this.genres.removeAt(index);
  }

  // Existing methods for images
  addImage() {
    this.images.push(this.fb.control('', Validators.required));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  fetchActors(): void {
    this.actorService.getActors().subscribe(
      actors => {
        // Map the actors to their full names (name + lastName)
        this.allActors = actors.map(actor => `${actor.name} ${actor.lastName}`);
      },
      error => {
        console.error('Error fetching actors:', error);
      }
    );
  }

  ngOnInit(): void {
    this.fetchActors();
  
    // If the form is used to add a new movie, the form should be initialized here
    if (this.router.url.includes('new-movie')) {
      console.log('New movie form');
      return;
    }
  
    console.log('Edit movie form');
    // If the form is used to edit a movie, the movie data should be loaded here
    this.formMode = 'edit';
  
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.movieService.getMovieById(id))
      ).subscribe(movie => {
        if (!movie) {
          console.error('Movie not found');
          this.router.navigateByUrl('/new-movie');
          return; // Explicitly return void
        }
  
        // Reset the form with the movie data
        this.movieForm.reset(movie);
  
        // Clear the existing cast and genres arrays
        this.cast.clear();
        this.genres.clear();
  
        // Populate the cast FormArray
        if (movie.cast && Array.isArray(movie.cast)) {
          movie.cast.forEach(actor => {
            this.cast.push(this.fb.control(actor));
          });
        }
  
        // Populate the genres FormArray
        if (movie.genres && Array.isArray(movie.genres)) {
          movie.genres.forEach(genre => {
            this.genres.push(this.fb.control(genre));
          });
        }
  
        return; // Explicitly return void
      });
  }



  // onSubmit() {
  //   if (this.movieForm.valid) {
  //     console.log('Form submitted', this.movieForm.value);
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

  onSubmit() {
    if (this.movieForm.valid) {
      const movieData = this.movieForm.value as IMovie; // Get the form data
      
      if (this.formMode === 'add'){
      // Call the service to add the movie
        this.movieService.addMovie(movieData).subscribe({
          next: (response) => {
            // Handle success
            this.snackBar.open('Movie added successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/catalog']); // Redirect to the movies list page
          },
          error: (error) => {
            // Handle error
            console.error('Error creating movie:', error);
            this.snackBar.open('Failed to create movie. Please try again.', 'Close', { duration: 3000 });
          }
        });


      } else if (this.formMode === 'edit') {
        // Get the movie ID from the route
        const movieId = this.activatedRoute.snapshot.params['id'];
  
        // Call the service to update the movie
        this.movieService.editMovie(movieId, movieData).subscribe({
          next: (response) => {
            // Handle success
            this.snackBar.open('Movie updated successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/catalog']); // Redirect to the movies list page
          },
          error: (error) => {
            // Handle error
            console.error('Error updating movie:', error);
            this.snackBar.open('Failed to update movie. Please try again.', 'Close', { duration: 3000 });
          }
        });
      }

    } else {
      // Handle invalid form
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', { duration: 3000 });
    }
  }
}