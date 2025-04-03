import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCategorieVehiculeComponent } from './ajout-categorie-vehicule.component';

describe('AjoutCategorieVehiculeComponent', () => {
  let component: AjoutCategorieVehiculeComponent;
  let fixture: ComponentFixture<AjoutCategorieVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutCategorieVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutCategorieVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
