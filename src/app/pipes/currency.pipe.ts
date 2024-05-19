import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currencySymbol: string = '$', conversionRate: number = 1): string {
    if (value == null) {
      return '';
    }
    const convertedValue = value * conversionRate;
    return `${currencySymbol}${convertedValue.toFixed(2)}`;
  }
}






