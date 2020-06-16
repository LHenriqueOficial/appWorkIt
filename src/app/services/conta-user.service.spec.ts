import { TestBed } from '@angular/core/testing';

import { ContaUserService } from './conta-user.service';

describe('ContaUserService', () => {
  let service: ContaUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
