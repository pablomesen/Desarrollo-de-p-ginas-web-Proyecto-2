import { ActorService } from './actor.service';
import { TestBed } from '@angular/core/testing';


describe('ActorsService', () => {
  let service: ActorService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
