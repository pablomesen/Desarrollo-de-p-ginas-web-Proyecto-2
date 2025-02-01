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

  // Nuevo método para manejar la eliminación
  onActorDeleted(actorId: string) {
    // Actualizar ambos arrays removiendo el actor eliminado
    this.actors = this.actors.filter(actor => (actor as any)._id !== actorId);
    this.filteredActors = this.filteredActors.filter(actor => (actor as any)._id !== actorId);
    
    // Verificar si necesitamos ajustar la página actual
    if (this.paginatedActors.length === 0 && this.currentPage > 1) {
      this.currentPage--;
    }
    // Reaplicar la búsqueda para actualizar la lista filtrada
    this.applySearch();
  }

  onSearchActors(query: string) {
    this.searchQuery = query;
    this.applySearch();
  }

  applySearch() {
    let results = [...this.actors];
    if (this.searchQuery) {
      results = results.filter(actor =>
        actor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        actor.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.filteredActors = results;
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