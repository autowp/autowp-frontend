import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page';
import {PageEnvService} from '../../services/page-env.service';
import {BehaviorSubject} from 'rxjs';
import {map, switchMapTo} from 'rxjs/operators';

@Component({
  selector: 'app-moder-pages',
  templateUrl: './pages.component.html'
})
export class ModerPagesComponent implements OnInit {
  private load$ = new BehaviorSubject<null>(null);

  public items$ = this.load$.pipe(switchMapTo(this.pageService.getPagesPipe())).pipe(
    map( items => this.pageService.toPlainArray(items.items, 0))
  );

  constructor(
    private pageService: PageService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          nameTranslated: $localize `Pages`,
          pageId: 68
        }),
      0
    );
  }
}
