import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';

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

  public currentImageIndex = 0;

  constructor(
    public movieDetailDialogRef: MatDialogRef<MovieDetailsDialogComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any
  ) { 

  }

  onClose (): void {
    this.movieDetailDialogRef.close();
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/placeholder.jpg';
  }
  
  getImagesLength(): number {
    return this.data.images?.length || 0;
  }

  hasMultipleImages(): boolean {
    return Array.isArray(this.data.images) && this.data.images.length > 1;
  }

  previousImage(event: Event): void {
    event.stopPropagation();
    if (!this.hasMultipleImages()) return;

    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.getImagesLength() - 1;
    }
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    if (!this.hasMultipleImages()) return;

    if (this.currentImageIndex < this.getImagesLength() - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

}
