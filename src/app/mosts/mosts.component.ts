import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import {
  MostsService,
  APIMostsItem,
  APIMostsMenuRating,
  APIMostsMenuYear
} from './mosts.service';
import { Subscription, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { APIVehicleType } from '../services/vehicle-type';
import { PageEnvService } from '../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  tap,
  switchMap
} from 'rxjs/operators';

function vehicleTypesToList(vehilceTypes: APIVehicleType[]): APIVehicleType[] {
  const result: APIVehicleType[] = [];
  for (const item of vehilceTypes) {
    result.push(item);
    for (const child of item.childs) {
      result.push(child);
    }
  }

  return result;
}

@Component({
  selector: 'app-mosts',
  templateUrl: './mosts.component.html',
  styleUrls: ['./styles.scss']
})
@Injectable()
export class MostsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public items: APIMostsItem[];
  public years: APIMostsMenuYear[];
  public ratings: APIMostsMenuRating[];
  public vehilceTypes: APIVehicleType[];
  public loading = 0;
  public ratingCatname: string;
  public typeCatname: string;
  public yearsCatname: string;
  public defaultTypeCatname: string;

  constructor(
    private mostsService: MostsService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    this.routeSub = combineLatest(
      this.route.params.pipe(
        distinctUntilChanged(),
        debounceTime(30)
      ),
      this.mostsService.getMenu(),
      (params, menu) => ({ params, menu })
    )
      .pipe(
        tap(data => {
          this.ratingCatname = data.params.rating_catname;
          this.typeCatname = data.params.type_catname;
          this.yearsCatname = data.params.years_catname;

          this.years = data.menu.years;
          this.ratings = data.menu.ratings;
          this.vehilceTypes = vehicleTypesToList(data.menu.vehilce_types);

          this.defaultTypeCatname = this.vehilceTypes[0].catname;

          if (!this.ratingCatname) {
            this.ratingCatname = this.ratings[0].catname;
          }

          this.initPageEnv();
        }),
        switchMap(data =>
          this.mostsService.getItems({
            rating_catname: this.ratingCatname,
            type_catname: this.typeCatname,
            years_catname: this.yearsCatname
          })
        )
      )
      .subscribe(response => {
        this.items = response.items;
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  private initPageEnv() {
    this.pageEnv.set({
      layout: {
        needRight: false
      },
      name: 'page/21/name',
      pageId: 21
    });
  }
}
