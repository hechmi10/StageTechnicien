import { TestBed } from '@angular/core/testing';

import { GestionRetardService } from './gestion-retard.service';

describe('GestionRetardService', () => {
  let service: GestionRetardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionRetardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
