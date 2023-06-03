import {Component, OnInit} from '@angular/core';
import {UserService, APIUser} from '@services/user';
import {PageEnvService} from '@services/page-env.service';

interface LogItem {
  sum: number;
  currency: string;
  date: string;
  user_id: number;
  user?: APIUser;
}

@Component({
  selector: 'app-donate-log',
  templateUrl: './log.component.html',
})
export class DonateLogComponent implements OnInit {
  protected readonly items: LogItem[];

  constructor(private readonly userService: UserService, private readonly pageEnv: PageEnvService) {
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
