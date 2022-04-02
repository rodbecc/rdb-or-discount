import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TUI_NUMBER_FORMAT } from '@taiga-ui/core';
import { add, Dinero, dinero, multiply, toUnit, trimScale } from 'dinero.js';
import { combineLatest, map, reduce } from 'rxjs';
import { BRL, Currency } from '@dinero.js/currencies';

import { toSafeNumber } from './utils/rxjs-safe.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: TUI_NUMBER_FORMAT,
      useValue: { decimalSeparator: ',', thousandSeparator: '.' },
    },
  ],
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      invested_value: 0,
      monthly_rate: 0,
      parcels: 1,
    });

    const investedValue = this.form
      .get('invested_value')
      .valueChanges.pipe(toSafeNumber(), map(dinero));

    const monthlyRate = this.form
      .get('monthly_rate')
      .valueChanges.pipe(toSafeNumber(4));

    const parcels = this.form.get('parcels').valueChanges.pipe(toSafeNumber(4));

    const parcelas = 5;

    combineLatest([investedValue, monthlyRate, parcels])
      .pipe(
        // map([a,b] => )
        map(([a, b]) => multiply(a, b)),
        map((x) => toUnit(x))
      )
      .subscribe(console.log);

    this.calculate2(1000, 10, 3);

    // 100 + 85 + 68,5 + (250 + ant)*10

    // this.calculate(
    //   dinero({ amount: 100000, currency: BRL }),
    //   dinero({ amount: 1000, currency: BRL, scale: 4 }),
    //   5
    // );
  }

  calculate(
    investedValue: Dinero<number>,
    monthlyRate: Dinero<number>,
    parcels: number
  ) {
    // const parcelValue = investedValue / totalParcels;
    // // const [parcelValue] = allocate(investedValue, [totalParcels;
    // let currentParcel = 1;
    // let accInterest = 0;
    // while (currentParcel <= totalParcels) {
    //   const remainingValueFromInvestment =
    //     investedValue - (currentParcel - 1) * parcelValue; // 750
    //   const remainingValuePlusPreviousMonthInterest =
    //     remainingValueFromInvestment + accInterest; // 750 + 100
    //   const interestOnThisMonth =
    //     (remainingValuePlusPreviousMonthInterest * monthlyRate) / 100; // 85;
    //   accInterest += interestOnThisMonth;
    //   currentParcel++;
    //   console.log(
    //     remainingValueFromInvestment,
    //     remainingValuePlusPreviousMonthInterest,
    //     interestOnThisMonth,
    //     accInterest
    //   );
    // }
  }

  private calculate2(
    investedValue: number,
    monthlyRate: number,
    totalParcels: number
  ) {
    const parcelValue = investedValue / totalParcels;
    let currentParcel = 1;
    let accInterest = 0;
    while (currentParcel <= totalParcels) {
      const remainingValueFromInvestment =
        investedValue - (currentParcel - 1) * parcelValue; // 750

      const remainingValuePlusPreviousMonthInterest =
        remainingValueFromInvestment + accInterest; // 750 + 100

      const interestOnThisMonth =
        (remainingValuePlusPreviousMonthInterest * monthlyRate) / 100; // 85;

      accInterest += interestOnThisMonth;
      currentParcel++;
      console.log(
        remainingValueFromInvestment,
        remainingValuePlusPreviousMonthInterest,
        interestOnThisMonth,
        accInterest
      );
    }
  }
}
