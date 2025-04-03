import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousValidesComponent } from './rendez-vous-valides.component';

describe('RendezVousValidesComponent', () => {
  let component: RendezVousValidesComponent;
  let fixture: ComponentFixture<RendezVousValidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezVousValidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezVousValidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
