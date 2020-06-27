import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GelismisService } from './gelismis.service';

@Injectable({
  providedIn: 'root'
})
export class ServisIcerenService {
    

   constructor(private gelismis:GelismisService) {}

  keyfiSayiUret():any{
      return this.gelismis.keyfiSayiUret();
  }
}
