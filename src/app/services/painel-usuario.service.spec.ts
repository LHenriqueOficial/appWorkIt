import { TestBed } from '@angular/core/testing';

import { PainelUsuarioService } from './painel-usuario.service';

describe('PainelUsuarioService', () => {
  let service: PainelUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PainelUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
