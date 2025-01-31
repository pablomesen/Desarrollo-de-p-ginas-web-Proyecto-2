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
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';



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
  movieForm: FormGroup;
  castInput = new FormControl('');
  genreInput = new FormControl('');
  
  allActors = [
    'Tom Hanks', 'Meryl Streep', 'Leonardo DiCaprio', 
    'Jennifer Lawrence', 'Denzel Washington', 'Scarlett Johansson'
  ];
  
  allGenres = [
    'Action', 'Comedy', 'Drama', 'Fantasy', 
    'Horror', 'Mystery', 'Romance', 'Thriller'
  ];

  filteredActors: Observable<string[]>;
  filteredGenres: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
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

  private _filterActors(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allActors.filter(actor => 
      actor.toLowerCase().includes(filterValue)
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
    const value = this.castInput.value?.trim();

    // Check if the actor is in the database (allActors)
    if (value && this.allActors.includes(value)) {
      // Check if the actor is already in the cast array
      const isDuplicate = this.cast.controls.some(
        control => control.value.toLowerCase() === value.toLowerCase()
      );
  
      if (isDuplicate) {
        this.snackBar.open('This actor is already added.', 'Close', { duration: 3000 }); // Or use a more user-friendly feedback mechanism
      } else {
        this.cast.push(this.fb.control(value));
        this.castInput.setValue('');
      }
    } else {
      this.snackBar.open('Actor not found in the database.', 'Close', { duration: 3000 }); // Or use a more user-friendly feedback mechanism
    }
  }

  onCastOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedActor = event.option.value;

    // Check if the actor is already in the cast array
    const isDuplicate = this.cast.controls.some(
      control => control.value.toLowerCase() === selectedActor.toLowerCase()
    );
  
    if (isDuplicate) {
      this.snackBar.open('This actor is already added.', 'Close', { duration: 3000 });
    } else {
      this.cast.push(this.fb.control(selectedActor));
      this.castInput.setValue('');
    }
  }

  removeCast(index: number) {
    this.cast.removeAt(index);
  }

  // Genre methods
  addGenreFromInput() {
    const value = this.genreInput.value?.trim();

    // Check if the genre is in the database (allGenres)
    if (value && this.allGenres.includes(value)) {
      // Check if the genre is already in the genres array
      const isDuplicate = this.genres.controls.some(
        control => control.value.toLowerCase() === value.toLowerCase()
      );

      if (isDuplicate) {
        this.snackBar.open('This genre is already added.', 'Close', { duration: 3000 });
      } else {
        this.genres.push(this.fb.control(value));
        this.genreInput.setValue('');
      }
    } else {
      this.snackBar.open('Genre not found in the database.', 'Close', { duration: 3000 });
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
      this.genres.push(this.fb.control(event.option.value));
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

  onSubmit() {
    if (this.movieForm.valid) {
      console.log('Form submitted', this.movieForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}