import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasitService {

  constructor() { }

  karesi(sayi:number):number{
      return sayi*sayi
  }
}
