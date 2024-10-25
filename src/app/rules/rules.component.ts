import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {Markdown2Component} from '@utils/markdown2/markdown2.component';

@Component({
  imports: [RouterLink, Markdown2Component],
  selector: 'app-rules',
  standalone: true,
  templateUrl: './rules.component.html',
})
export class RulesComponent implements OnInit {
  private readonly pageEnv = inject(PageEnvService);

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 106}), 0);
  }
}
