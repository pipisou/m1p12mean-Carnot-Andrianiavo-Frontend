import { TestBed } from '@angular/core/testing';

import { CurrentCommandeService } from './current-commande.service';

describe('CurrentCommandeService', () => {
  let service: CurrentCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
