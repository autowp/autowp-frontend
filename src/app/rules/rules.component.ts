import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
})
export class RulesComponent implements OnInit {
  constructor(private readonly pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 106}), 0);
  }
}
