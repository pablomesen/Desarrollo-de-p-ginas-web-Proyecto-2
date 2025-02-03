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
  selector: 'app-actor-form',
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
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.scss'
})



export class ActorFormComponent {

  public formMode: 'add' | 'edit' = 'add';
  actorForm: FormGroup;
  movieInput = new FormControl('');
  allMovies: IMovie[] = [];
  filteredMovies: Observable<IMovie[]>;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private movieService: MovieService,
    private actorService: ActorService,
    private activatedRoute: ActivatedRoute,
    private router: Router 
  ) {

    this.actorForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      biography: ['', Validators.required],
      movies: this.fb.array([], Validators.required), // This will store IMovie objects
      images: this.fb.array([this.fb.control('', Validators.required)])

    });

    this.filteredMovies = this.movieInput.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMovies(value || ''))
    );
  }

  private _filterMovies(value: string): IMovie[] {
    const filterValue = value.toLowerCase();
    return this.allMovies.filter(movie =>
      movie.title.toLowerCase().includes(filterValue) // Filter by movie title
    );
  }

  get currentActor(): IActor {
    const movie = this.actorForm.value as IActor;
    return movie;
  }

  get movies() {
    return this.actorForm.get('movies') as FormArray;
  }

  get images() {
    return this.actorForm.get('images') as FormArray;
  }

  addImage() {
    this.images.push(this.fb.control('', Validators.required));
  }

  displayMovieTitle(movie: IMovie): string {
    return movie ? movie.title : '';
  }

  addMovieFromInput() {
    const value = this.movieInput.value?.trim(); // Safe access using optional chaining
  
    if (!value) {
      this.snackBar.open('Please enter a movie.', 'Close', { duration: 3000 });
      return; // Exit early if no value is provided
    }
  
    // Find the movie object in the allMovies array
    const selectedMovie = this.allMovies.find(movie => movie.title.toLowerCase() === value.toLowerCase());
  
    if (selectedMovie) {
      // Check if the movie is already in the movies array
      const isDuplicate = this.movies.controls.some(
        control => control.value.title.toLowerCase() === selectedMovie.title.toLowerCase()
      );
  
      if (isDuplicate) {
        this.snackBar.open('This movie is already added.', 'Close', { duration: 3000 });
      } else {
        this.movies.push(this.fb.control(selectedMovie)); // Add the IMovie object
        this.movieInput.setValue('');
      }
    } else {
      this.snackBar.open('Movie not found in the database.', 'Close', { duration: 3000 });
    }
  }

  onMovieOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedMovie = event.option.value as IMovie; // Get the selected IMovie object
  
    // Check if the movie is already in the movies array
    const isDuplicate = this.movies.controls.some(
      control => control.value.title.toLowerCase() === selectedMovie.title.toLowerCase()
    );
  
    if (isDuplicate) {
      this.snackBar.open('This movie is already added.', 'Close', { duration: 3000 });
    } else {
      this.movies.push(this.fb.control(selectedMovie)); // Add the IMovie object
      this.movieInput.setValue('');
    }
  }

  removeMovie(index: number) {
    this.movies.removeAt(index);
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }
  
  fetchMovies() {
    this.movieService.getMovies().subscribe(
      movies => {
        this.allMovies = movies; // Store the full IMovie objects
      }
    );
  }

  // ngOnInit() {
  //   this.fetchMovies();

  //   // If the form is used to add a new actor, the form should be initialixed here
  //   if (this.router.url.includes('new-actor')) {
  //     console.log('New actor form');
  //     return;
  //   }

  //   console.log('Edit actor form');
  //   // If the form is used to edit an existing actor, the form should be initialized here
  //   this.formMode = 'edit';

  //   this.activatedRoute.params
  //     .pipe(
  //       switchMap(({ id }) => this.actorService.getActorById(id))
  //     ).subscribe(actor => {
  //       if (!actor) {
  //         console.error('Actor not found');
  //         this.router.navigateByUrl('/new-actor');
  //         return; // Explicitly return void
  //       }
  
  //       // Reset the form with the actor data
  //       this.actorForm.reset(actor);
  
  //       // Clear the existing movies arrays
  //       this.movies.clear();
  
  //       // Populate the movie FormArray
  //       if (actor.movies && Array.isArray(actor.movies)) {
  //         actor.movies.forEach(movie => {
  //           this.movies.push(this.fb.control(movie));
  //         });
  //       }
  
  //       return; // Explicitly return void        
  //     })
  // }

  ngOnInit() {
    this.fetchMovies();
  
    // If the form is used to add a new actor, the form should be initialized here
    if (this.router.url.includes('new-actor')) {
      console.log('New actor form');
      return;
    }
  
    console.log('Edit actor form');
    // If the form is used to edit an existing actor, the form should be initialized here
    this.formMode = 'edit';
  
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.actorService.getActorById(id))
      ).subscribe(actor => {
        if (!actor) {
          console.error('Actor not found');
          this.router.navigateByUrl('/new-actor');
          return; // Explicitly return void
        }
  
        // Reset the form with the actor data
        this.actorForm.reset(actor);
  
        // Clear the existing movies arrays
        this.movies.clear();
  
        // Populate the movie FormArray
        if (actor.movies && Array.isArray(actor.movies)) {
          actor.movies.forEach(movie => {
            this.movies.push(this.fb.control(movie));
          });
        }
  
        // Clear the existing images arrays
        this.images.clear();
  
        // Populate the images FormArray
        if (actor.images && Array.isArray(actor.images)) {
          actor.images.forEach(image => {
            this.images.push(this.fb.control(image, Validators.required));
          });
        }
  
        return; // Explicitly return void        
      });
  }

  onSubmit() {
    if (this.actorForm.valid) {
      const movieData = this.actorForm.value as IActor; // Get the form data
      
      if (this.formMode === 'add'){
      // Call the service to add the movie
        this.actorService.addActor(movieData).subscribe({
          next: (response) => {
            // Handle success
            this.snackBar.open('Actor added successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/catalog']); // Redirect to the movies list page
          },
          error: (error) => {
            // Handle error
            console.error('Error creating actor:', error);
            this.snackBar.open('Failed to create actor. Please try again.', 'Close', { duration: 3000 });
          }
        });


      } else if (this.formMode === 'edit') {
        // Get the movie ID from the route
        const actorId = this.activatedRoute.snapshot.params['id'];
  
        // Call the service to update the actor
        this.actorService.editActor(actorId, movieData).subscribe({
          next: (response) => {
            // Handle success
            this.snackBar.open('Actor updated successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/catalog']); // Redirect to the movies list page
          },
          error: (error) => {
            // Handle error
            console.error('Error updating actor:', error);
            this.snackBar.open('Failed to update actor. Please try again.', 'Close', { duration: 3000 });
          }
        });
      }

    } else {
      // Handle invalid form
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', { duration: 3000 });
    }
  }
}

