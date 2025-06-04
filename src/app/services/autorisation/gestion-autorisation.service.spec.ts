import { TestBed } from '@angular/core/testing';

import { GestionAutorisationService } from './gestion-autorisation.service';

describe('GestionAutorisationService', () => {
  let service: GestionAutorisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionAutorisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
