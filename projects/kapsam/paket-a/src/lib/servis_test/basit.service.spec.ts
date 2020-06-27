import { TestBed } from "@angular/core/testing";
import { BasitService } from "./basit.service";

describe("PaketAService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: BasitService = TestBed.get(BasitService);
    expect(service).toBeTruthy();
  });

  it("should return number", () => {
    const service: BasitService = TestBed.get(BasitService);
    const result = service.karesi(3)
    expect(result).toEqual(9);
  });
});
