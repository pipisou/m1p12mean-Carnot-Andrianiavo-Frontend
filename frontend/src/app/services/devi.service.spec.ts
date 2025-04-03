import { TestBed } from '@angular/core/testing';

import { DeviService } from './devi.service';

describe('DeviService', () => {
  let service: DeviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
