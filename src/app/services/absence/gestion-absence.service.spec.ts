import { TestBed } from '@angular/core/testing';

import { GestionAbsenceService } from './gestion-absence.service';

describe('GestionAbsenceService', () => {
  let service: GestionAbsenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionAbsenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
