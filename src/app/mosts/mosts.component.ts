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
        name: 'page/21/name',
        pageId: 21
      });
    }, 0);

    this.routeSub = this.route.params.pipe(
      distinctUntilChanged(),
      debounceTime(30),
      tap(params => {
        this.ratingCatname = params.rating_catname;
        this.typeCatname = params.type_catname;
        this.yearsCatname = params.years_catname;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
