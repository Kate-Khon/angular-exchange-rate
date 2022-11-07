import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { CurrencyService } from "src/app/services/currency.service";

@Component({
  selector: 'app-currenciesInfo',
  templateUrl: './currenciesInfo.component.html',
  styleUrls: ['./currenciesInfo.component.scss'],
})

export class CurrenciesInfoComponent implements OnChanges {
  @Input() from: string = '';
  @Input() to: string = '';
  @Input() amountField1: string = '';
  @Input() field1?: HTMLDataElement;
  @Input() amountField2: string = '';
  @Input() field2?: HTMLDataElement;
  @Output() setAmount = new EventEmitter<number>();
  loading = true;

  constructor(private currencyService: CurrencyService) {
  }

  useSetAmount(): void {
    this.setAmount.next(0);
  }

  getResult(from: string, to: string, amount: string, field: HTMLDataElement) {
    this.currencyService.getCurrencyInfo(from, to, amount).subscribe((data) => {
      this.loading = false;
      this.useSetAmount();

      if (data.success) {
        field.value = `${data.result}`;
      } else {
        field.value = '0';
      }
    })
  }

  ngOnChanges(): void {
    this.loading = true;

    if (this.amountField1 && this.field2) {
      if (+this.amountField1 < 1 && this.field1) {
        this.amountField1 = '1';
        this.field1.value = '1';
      }

      this.getResult(this.from, this.to, this.amountField1, this.field2);
    } else if (this.amountField2 && this.field1) {
      if (+this.amountField2 < 1 && this.field2) {
        this.amountField2 = '1';
        this.field2.value = '1';
      }

      this.getResult(this.to, this.from, this.amountField2, this.field1);
    }
  }
}
