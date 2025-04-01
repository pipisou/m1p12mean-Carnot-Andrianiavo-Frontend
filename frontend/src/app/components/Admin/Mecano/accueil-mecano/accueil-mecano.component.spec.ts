import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilMecanoComponent } from './accueil-mecano.component';

describe('AccueilMecanoComponent', () => {
  let component: AccueilMecanoComponent;
  let fixture: ComponentFixture<AccueilMecanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilMecanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilMecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
