import { TestBed } from '@angular/core/testing';

import { QuitterService } from './quitter.service';

describe('QuitterService', () => {
  let service: QuitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
