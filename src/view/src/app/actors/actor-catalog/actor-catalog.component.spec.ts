import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorCatalogComponent } from './actor-catalog.component';

describe('ActorCatalogComponent', () => {
  let component: ActorCatalogComponent;
  let fixture: ComponentFixture<ActorCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
