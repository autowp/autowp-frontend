import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {DonationsClient} from '@grpc/spec.pbsc';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {Empty} from '@ngx-grpc/well-known-types';
import {LanguageService} from '@services/language';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {map} from 'rxjs/operators';

import {ethToEur, eurToRub} from '../../currencies';

const rates: {[key: string]: number} = {
  'ETH': ethToEur,
  'EUR': 1,
  'RUB': 1 / eurToRub,
};

@Component({
  imports: [NgbTooltip, AsyncPipe, CurrencyPipe, TimeAgoPipe],
  selector: 'app-index-donate',
  styleUrls: ['./donate.component.scss'],
  templateUrl: './donate.component.html',
})
export class IndexDonateComponent {
  protected readonly languageService = inject(LanguageService);
  readonly #donations = inject(DonationsClient);

  protected readonly goal = 2500;
  readonly #monthlyCharge = 161.88;

  protected readonly state$ = this.#donations.getTransactions(new Empty()).pipe(
    map((res) => {
      const operations = res.items || [];
      const donations = operations
        .filter((d) => d.sum > 0)
        .map((d) => ({
          contributor: d.contributor,
          currency: d.currency,
          date: d.date?.toDate(),
          normalizedSum: (rates[d.currency] * d.sum) / 100,
          purpose: d.purpose,
          sum: d.sum / 100,
        }));
      const charges = operations.filter((d) => d.sum < 0);
      const totalChargesSum = charges.reduce((sum, d) => sum + (d.sum * rates[d.currency]) / 100, 0);
      const totalDonationsSum = donations.reduce((sum, d) => sum + d.sum * rates[d.currency], 0);

      const total = Math.max(-totalChargesSum + this.#monthlyCharge, totalDonationsSum);

      return {
        charges: charges.map((o) => ({
          currency: o.currency,
          date: o.date?.toDate(),
          percent: (-100 * o.sum * rates[o.currency]) / 100 / total,
          purpose: o.purpose,
          sum: o.sum / 100,
        })),
        donations: donations.map((o) => ({
          contributor: o.contributor,
          currency: o.currency,
          date: o.date,
          percent: (100 * o.sum * rates[o.currency]) / total,
          sum: o.sum,
        })),
        monthlyCharge: this.#monthlyCharge,
        monthlyChargePercent: (100 * this.#monthlyCharge) / total,
      };
    }),
  );
}
