import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEnvService } from '../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-mosts',
  templateUrl: './mosts.component.html'
})
@Injectable()
export class MostsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public ratingCatname: string;
  public typeCatname: string;
  public yearsCatname: string;

  constructor(
    private route: ActivatedRoute,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.pageEnv.set({
        layout: {
          needRight: false
        },
        nameTranslated: $localize `Mostly`,
        pageId: 21
      });
    }, 0);

    this.routeSub = this.route.paramMap.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      debounceTime(30),
      tap(params => {
        this.ratingCatname = params.get('rating_catname');
        this.typeCatname = params.get('type_catname');
        this.yearsCatname = params.get('years_catname');
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
