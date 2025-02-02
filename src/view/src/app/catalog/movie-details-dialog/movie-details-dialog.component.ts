import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-movie-details-dialog',
  imports: [
            MatButtonModule,
            MatChipsModule,
            CommonModule
          ],
  templateUrl: './movie-details-dialog.component.html',
  styleUrl: './movie-details-dialog.component.scss'
})
export class MovieDetailsDialogComponent {
  constructor(
    public movieDetailDialogRef: MatDialogRef<MovieDetailsDialogComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any
  ) { }

  onClose (): void {
    this.movieDetailDialogRef.close();
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/placeholder.jpg';
  }
}
