import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-donate-vod-success',
  templateUrl: './success.component.html',
})
export class DonateVodSuccessComponent implements OnInit {
  constructor(private readonly pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 196}), 0);
  }
}
