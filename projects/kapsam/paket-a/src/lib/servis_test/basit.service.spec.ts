import { TestBed } from '@angular/core/testing';
import { BasitService } from './basit.service';

describe('PaketAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasitService = TestBed.get(BasitService);
    expect(service).toBeTruthy();
  });
});
