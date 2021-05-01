import {Component, OnDestroy, OnInit} from '@angular/core';
import {APIPageLinearized, PageService} from '../../services/page';
import {PageEnvService} from '../../services/page-env.service';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {switchMapTo} from 'rxjs/operators';

@Component({
  selector: 'app-moder-pages',
  templateUrl: './pages.component.html'
})
export class ModerPagesComponent implements OnInit, OnDestroy {
  public items: APIPageLinearized[] = [];
  private load$ = new BehaviorSubject<null>(null);
  private sub: Subscription;

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

    this.sub = combineLatest([
      this.load$.pipe(switchMapTo(this.pageService.getPagesPipe()))
    ]).subscribe(([ items]) => {
      this.items = this.pageService.toPlainArray(items.items, 0);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
