import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Exchange rate';
  from = '';
  to = '';
  amountField1 = '';
  amountField2 = '';
  currenciesList: string[] = [
    'UAH',
    'USD',
    'EUR',
  ];

  setAmount(field: number, value: string = '') {
    if (this.from && this.to) {
      if (field === 1) {
        this.amountField1 = value;
        this.amountField2 = '';
      } else if (field === 2) {
        this.amountField2 = value;
        this.amountField1 = '';
      } else {
        this.amountField1 = '';
        this.amountField2 = '';
      }
    }
  }
}
