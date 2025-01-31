import { Component } from '@angular/core';
import { ActorListComponent } from "../actor-list/actor-list.component";

@Component({
  selector: 'app-actor-list',
  standalone: true, // Si es un componente independiente
  templateUrl: './actor-catalog.component.html',
  styleUrls: ['./actor-catalog.component.scss'],
  imports: [ActorListComponent], // Corregido el error de "styleUrl"
})
export class ActorCatalogComponent {}
