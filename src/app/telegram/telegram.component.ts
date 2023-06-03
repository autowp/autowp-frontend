import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
})
export class TelegramComponent implements OnInit {
  constructor(private readonly pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 204}), 0);
  }
}
