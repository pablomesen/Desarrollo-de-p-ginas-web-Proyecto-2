import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActorDetailComponent } from './actor-details.component';

describe('ActorDetailsComponent', () => {
  let component: ActorDetailComponent;
  let fixture: ComponentFixture<ActorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
