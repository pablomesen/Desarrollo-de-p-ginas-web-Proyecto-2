import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorCardComponent } from '../actor-card/actor-card.component';
import { SearchAreaComponent } from '../../catalog/search-area/search-area.component';
import { IActor } from '../../../../../models/Actor';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [
    CommonModule,
    ActorCardComponent,
    SearchAreaComponent
  ],
  templateUrl: './actor-list.component.html'
})
export class ActorListComponent implements OnInit {
  actors: IActor[] = [];
  filteredActors: IActor[] = [];
  currentPage = 1;
  actorsPerPage = 12;
  searchQuery = '';

  constructor(private actorService: ActorService) {}

  ngOnInit() {
    this.getActors();
  }

  getActors() {
    this.actorService.getActors().subscribe(
      (data) => {
        this.actors = data;
        this.applySearch();
      },
      (error) => {
        console.error('Error fetching actors:', error);
      }
    );
  }

  onSearchActors(query: string) {
    this.searchQuery = query;
    this.applySearch();
  }

  applySearch() {
    let results = [...this.actors];

    // Apply search
    if (this.searchQuery) {
      results = results.filter(actor =>
        actor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        actor.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.filteredActors = results;
    this.currentPage = 1;
  }

  get paginatedActors(): IActor[] {
    const startIndex = (this.currentPage - 1) * this.actorsPerPage;
    return this.filteredActors.slice(startIndex, startIndex + this.actorsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredActors.length / this.actorsPerPage);
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