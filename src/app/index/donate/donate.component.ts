import {Component} from '@angular/core';
import {LanguageService} from '../../services/language';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

const rates = {
  'EUR': 1,
  'ETH': 2590.64,
  'RUB': 0.00934,
}

interface Donation {
  sum: number;
  currency: string;
  date: string;
  contributor: string|null;
  purpose: string|null;
}

@Component({
  selector: 'app-index-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class IndexDonateComponent {

  public goal = 2500;
  private monthlyCharge = 209.11;

  public $state = of(require('./data.json') as Donation[]).pipe(
    map(operations => {
      operations = operations.reverse();
      const donations = operations.filter(d => d.sum > 0);
      const totalDonationsSum = donations.reduce((sum, d) => sum + d.sum * rates[d.currency], 0);

      const charges = operations.filter(d => d.sum < 0);
      const totalChargesSum = charges.reduce((sum, d) => sum + d.sum * rates[d.currency], 0);

      const total = this.goal - totalChargesSum;

      const balance = totalDonationsSum + totalChargesSum;
      const needForNextMonth = this.monthlyCharge - balance;
      const needForNextTwoMonths = this.monthlyCharge * 2 - balance;

      return {
        needForNextMonth,
        needForNextMonthPercent: 100 * needForNextMonth / total,
        needForNextTwoMonths,
        needForNextTwoMonthsPercent: 100 * needForNextTwoMonths / total,
        donations: donations.map(o => ({
          sum: o.sum,
          currency: o.currency,
          percent: 100 * o.sum * rates[o.currency] / total,
          contributor: o.contributor
        })),
        charges: charges.map(o => ({
          sum: o.sum,
          currency: o.currency,
          percent: -100 * o.sum * rates[o.currency] / total,
          purpose: o.purpose
        })),
      };
    })
  );

  constructor(public languageService: LanguageService) {}
}
