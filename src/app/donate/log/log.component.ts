import {Component, OnInit} from '@angular/core';
import {DonationsClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-donate-log',
  templateUrl: './log.component.html',
})
export class DonateLogComponent implements OnInit {
  protected readonly items$ = this.donations.getTransactions(new Empty()).pipe(
    map((response) =>
      (response.items || []).map((item) => ({
        currency: item.currency,
        date: item.date?.toDate(),
        purpose: item.purpose,
        sum: item.sum / 100,
        user$: this.userService.getUser2$(item.userId),
      })),
    ),
  );

  constructor(
    private readonly userService: UserService,
    private readonly pageEnv: PageEnvService,
    private readonly donations: DonationsClient,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 196}), 0);
  }
}
