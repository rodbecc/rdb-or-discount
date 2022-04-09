import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  constructor() {}

  calculate2(investedValue: number, monthlyRate: number, totalParcels: number) {
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
        interestOnThisMonth
      );
      console.log("accurated Interest" + accInterest)
    }
    return accInterest;
  }
}
