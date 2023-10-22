import {Component} from '@angular/core';
import {LanguageService} from '@services/language';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

import data from './data.json';

const rates = {
  'ETH': 1067.07,
  'EUR': 1,
  'RUB': 0.009757,
};

interface Donation {
  contributor: null | string;
  currency: string;
  date: string;
  purpose: null | string;
  sum: number;
}

@Component({
  selector: 'app-index-donate',
  styleUrls: ['./donate.component.scss'],
  templateUrl: './donate.component.html',
})
export class IndexDonateComponent {
  protected readonly goal = 2500;
  private readonly monthlyCharge = 192.4;

  protected readonly state$ = of(data as Donation[]).pipe(
    map((operations) => {
      operations = operations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const donations = operations
        .filter((d) => d.sum > 0)
        .map((d) => ({
          contributor: d.contributor,
          currency: d.currency,
          date: new Date(d.date),
          normalizedSum: rates[d.currency] * d.sum,
          purpose: d.purpose,
          sum: d.sum,
        }));
      const charges = operations.filter((d) => d.sum < 0);
      const totalChargesSum = charges.reduce((sum, d) => sum + d.sum * rates[d.currency], 0);
      const totalDonationsSum = donations.reduce((sum, d) => sum + d.sum * rates[d.currency], 0);

      const total = Math.max(-totalChargesSum + this.monthlyCharge, totalDonationsSum);

      return {
        charges: charges.map((o) => ({
          currency: o.currency,
          date: o.date,
          percent: (-100 * o.sum * rates[o.currency]) / total,
          purpose: o.purpose,
          sum: o.sum,
        })),
        donations: donations.map((o) => ({
          contributor: o.contributor,
          currency: o.currency,
          date: o.date,
          percent: (100 * o.sum * rates[o.currency]) / total,
          sum: o.sum,
        })),
        monthlyCharge: this.monthlyCharge,
        monthlyChargePercent: (100 * this.monthlyCharge) / total,
      };
    }),
  );

  constructor(protected readonly languageService: LanguageService) {}
}
