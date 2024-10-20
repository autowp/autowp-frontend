import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';

@Component({
  imports: [RouterLink],
  selector: 'app-policy',
  standalone: true,
  templateUrl: './policy.component.html',
})
export class PolicyComponent implements OnInit {
  private readonly pageEnv = inject(PageEnvService);

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 1}), 0);
  }
}
