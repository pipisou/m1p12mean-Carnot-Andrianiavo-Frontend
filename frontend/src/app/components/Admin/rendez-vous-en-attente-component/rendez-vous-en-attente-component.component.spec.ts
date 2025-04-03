import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousEnAttenteComponent } from './rendez-vous-en-attente-component.component';

describe('RendezVousEnAttenteComponentComponent', () => {
  let component: RendezVousEnAttenteComponent;
  let fixture: ComponentFixture<RendezVousEnAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezVousEnAttenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezVousEnAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
