import { Observable, map } from 'rxjs';
import { BRL, Currency } from '@dinero.js/currencies';

export const toSafeNumber =
  (scale: number = 2) =>
  (
    obs: Observable<number>
  ): Observable<{
    amount: number;
    currency: Currency<number>;
    scale?: number;
  }> =>
    obs.pipe(
      map((x: number) => x * BRL.base ** scale),
      map((x) => (Number.isInteger(x) ? x : Math.round(x))),
      map((x) => ({ amount: x, currency: BRL, scale }))
    );

export const toScaledAmount = (n: number, scale: number) =>
  Number.isInteger(n) ? n : { amount: n, scale };
