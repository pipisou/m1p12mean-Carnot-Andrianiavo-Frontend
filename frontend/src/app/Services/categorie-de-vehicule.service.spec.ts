import { TestBed } from '@angular/core/testing';

import { CategorieDeVehiculeService } from './categorie-de-vehicule.service';

describe('CategorieDeVehiculeService', () => {
  let service: CategorieDeVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieDeVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
