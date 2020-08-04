import { TestBed } from '@angular/core/testing';

import { ContaSistemaService } from './conta-sistema.service';

describe('ContaSistemaService', () => {
  let service: ContaSistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaSistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
