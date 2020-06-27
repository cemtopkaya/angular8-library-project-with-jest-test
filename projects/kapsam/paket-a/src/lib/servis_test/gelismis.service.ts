import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class GelismisService {
  constructor(private http: HttpClient) {}

  keyfiSayiUret(
    num: number = 10,
    min: number = 1,
    max: number = 10,
    col: number = 1,
    base: number = 10
  ): any {
    return this.http.get(
      `https://www.random.org/integers/?num=${num}&min=${min}&max=${max}&col=${col}&base=${base}&format=plain&rnd=new`
    );
  }
}
