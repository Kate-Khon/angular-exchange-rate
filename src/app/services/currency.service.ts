import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

interface data {
  date: string,
  info: {
    rate: number,
    timestamp: number,
  },
  query: {
    amount: 1,
    from: string,
    to: string,
  },
  result: number,
  success: boolean,
}

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      "apikey": "6hwLHnXO6UMjdSAy94hQ5xEQnO6lAI2h",
    })
  }

  getCurrencyInfo(from: string, to: string, amount: string): Observable<data> {
    return this.http.get<data>(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, { headers: this.httpOptions.headers });
  }
}
