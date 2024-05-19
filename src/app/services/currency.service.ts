import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencySubject = new BehaviorSubject<string>('USD');
  currency$ = this.currencySubject.asObservable();

  setCurrency(currency: string) {
    this.currencySubject.next(currency);
  }
}


