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

//import { IActor } from '../../../../models/Actor';
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

}

