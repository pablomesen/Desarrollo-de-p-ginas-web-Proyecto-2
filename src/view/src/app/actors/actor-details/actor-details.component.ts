import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ActorService } from '../../services/actor.service';
import { IActor } from '../../../../../models/Actor';

@Component({
  selector: 'app-actor-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-details.component.html' // Referencia al archivo HTML
})
export class ActorDetailComponent implements OnInit {
  actor: IActor | undefined;

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.actorService.getActorById(id).subscribe(
        (data) => {
          this.actor = data;
        },
        (error) => {
          console.error('Error fetching actor details:', error);
        }
      );
    }
  }
}