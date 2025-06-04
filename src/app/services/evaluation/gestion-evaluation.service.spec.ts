import { TestBed } from '@angular/core/testing';

import { GestionEvaluationService } from './gestion-evaluation.service';

describe('GestionEvaluationService', () => {
  let service: GestionEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
