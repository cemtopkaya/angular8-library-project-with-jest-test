import { TestBed } from "@angular/core/testing";

import { GelismisService } from './gelismis.service';
import { HttpClientModule } from '@angular/common/http';
import { ServisIcerenService } from './servis-iceren.service';

describe("Servis içeren Servis", () => {
  let service: ServisIcerenService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ServisIcerenService],
    })
  });

  it("should be created", () => {
    service = TestBed.get(ServisIcerenService);
    expect(service).toBeTruthy();
  });

  it("should return number", () => {
    const result = service.keyfiSayiUret()
    expect(result).toBeTruthy();
  });
});