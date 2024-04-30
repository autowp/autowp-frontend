import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';
import {APIUser, UserService} from '@services/user';

interface LogItem {
  currency: string;
  date: string;
  sum: number;
  user?: APIUser | null;
  user_id: number;
}

@Component({
  selector: 'app-donate-log',
  templateUrl: './log.component.html',
})
export class DonateLogComponent implements OnInit {
  protected readonly items: LogItem[];

  constructor(
    private readonly userService: UserService,
    private readonly pageEnv: PageEnvService,
  ) {
    this.items = require('./data.json');

    for (const item of this.items) {
      if (item.user_id) {
        this.userService.getUser$(item.user_id, {}).subscribe((user) => {
          item.user = user;
        });
      }
    }
  }

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 196}), 0);
  }
}
