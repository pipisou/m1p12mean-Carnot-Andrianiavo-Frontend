import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategorieVehiculeComponent } from './edit-categorie-vehicule.component';

describe('EditCategorieVehiculeComponent', () => {
  let component: EditCategorieVehiculeComponent;
  let fixture: ComponentFixture<EditCategorieVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategorieVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategorieVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
