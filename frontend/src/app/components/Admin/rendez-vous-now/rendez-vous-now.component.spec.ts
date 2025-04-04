import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousNowComponent } from './rendez-vous-now.component';

describe('RendezVousNowComponent', () => {
  let component: RendezVousNowComponent;
  let fixture: ComponentFixture<RendezVousNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezVousNowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezVousNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
