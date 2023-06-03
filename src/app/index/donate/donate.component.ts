import {Component} from '@angular/core';
import {LanguageService} from '@services/language';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

const rates = {
  'EUR': 1,
  'ETH': 1067.07,
  'RUB': 0.011169674,
};

interface Donation {
  sum: number;
  currency: string;
  date: string;
  contributor: string | null;
  purpose: string | null;
}

@Component({
  selector: 'app-index-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
})
export class IndexDonateComponent {
  protected readonly goal = 2500;
  private readonly monthlyCharge = 192.4;

  protected readonly state$ = of(require('./data.json') as Donation[]).pipe(
    map((operations) => {
      operations = operations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const donations = operations
        .filter((d) => d.sum > 0)
        .map((d) => ({
          sum: d.sum,
          normalizedSum: rates[d.currency] * d.sum,
          currency: d.currency,
          date: new Date(d.date),
          contributor: d.contributor,
          purpose: d.purpose,
        }));
      const charges = operations.filter((d) => d.sum < 0);
      const totalChargesSum = charges.reduce((sum, d) => sum + d.sum * rates[d.currency], 0);
      const totalDonationsSum = donations.reduce((sum, d) => sum + d.sum * rates[d.currency], 0);

      const total = Math.max(-totalChargesSum + this.monthlyCharge, totalDonationsSum);

      return {
        monthlyCharge: this.monthlyCharge,
        monthlyChargePercent: (100 * this.monthlyCharge) / total,
        donations: donations.map((o) => ({
          date: o.date,
          sum: o.sum,
          currency: o.currency,
          percent: (100 * o.sum * rates[o.currency]) / total,
          contributor: o.contributor,
        })),
        charges: charges.map((o) => ({
          date: o.date,
          sum: o.sum,
          currency: o.currency,
          percent: (-100 * o.sum * rates[o.currency]) / total,
          purpose: o.purpose,
        })),
      };
    })
  );

  constructor(protected readonly languageService: LanguageService) {}
}
