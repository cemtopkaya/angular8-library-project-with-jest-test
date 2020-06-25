import { TestBed } from '@angular/core/testing';

import { PaketAService } from './paket-a.service';

describe('PaketAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaketAService = TestBed.get(PaketAService);
    expect(service).toBeTruthy();
  });
});
