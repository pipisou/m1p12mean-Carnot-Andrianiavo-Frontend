import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixDateRendezVousComponent } from './choix-date-rendez-vous.component';

describe('ChoixDateRendezVousComponent', () => {
  let component: ChoixDateRendezVousComponent;
  let fixture: ComponentFixture<ChoixDateRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoixDateRendezVousComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixDateRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
