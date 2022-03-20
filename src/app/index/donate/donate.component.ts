import {Component} from '@angular/core';
import {LanguageService} from '../../services/language';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

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
      const donations = operations.filter(d => d.sum > 0);
      const totalDonationsSum = donations.reduce((sum, d) => sum + d.sum, 0);

      const charges = operations.filter(d => d.sum < 0);
      const totalChargesSum = charges.reduce((sum, d) => sum + d.sum, 0);

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
          percent: 100 * o.sum / total,
          contributor: o.contributor
        })),
        charges: charges.map(o => ({
          sum: o.sum,
          percent: -100 * o.sum / total,
          purpose: o.purpose
        })),
      };
    })
  );

  constructor(public languageService: LanguageService) {}
}
