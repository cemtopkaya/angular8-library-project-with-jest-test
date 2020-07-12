import { TestBed } from "@angular/core/testing";

import { HttpClientModule } from '@angular/common/http';

import { GelismisService } from './gelismis.service';

describe("PaketAService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GelismisService],
    })
  });

  it("should be created", () => {
    const service: GelismisService = TestBed.get(GelismisService);
    expect(service).toBeTruthy();
  });

  it("should return number", () => {
    const service: GelismisService= TestBed.get(GelismisService);
    const result = service.keyfiSayiUret(3);
    expect(result).toBeTruthy();
  });
});
