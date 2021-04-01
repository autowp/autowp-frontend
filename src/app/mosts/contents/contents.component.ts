import {Component, Injectable, OnInit, OnDestroy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  MostsService,
  APIMostsItem,
  APIMostsMenuRating,
  APIMostsMenuYear
} from '../mosts.service';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import { APIVehicleType } from '../../services/vehicle-type';
import { PageEnvService } from '../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  tap,
  switchMap, map
} from 'rxjs/operators';
import { getUnitTranslation } from '../../utils/translations';

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
  selector: 'app-mosts-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./styles.scss']
})
@Injectable()
export class MostsContentsComponent implements OnInit, OnDestroy, OnChanges {
  public items: APIMostsItem[];
  public years: APIMostsMenuYear[];
  public ratings: APIMostsMenuRating[];
  public vehilceTypes: APIVehicleType[];
  public loading = 0;
  @Input() prefix: string[] = ['/mosts'];
  @Input() ratingCatname: string;
  @Input() typeCatname: string;
  @Input() yearsCatname: string;
  @Input() brandID: number;
  public defaultTypeCatname: string;
  private params$ = new BehaviorSubject({
    ratingCatname: null,
    typeCatname: null,
    yearsCatname: null
  });
  private brandID$ = new BehaviorSubject(0);
  private sub: Subscription;

  constructor(
    private mostsService: MostsService,
    private pageEnv: PageEnvService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ratingCatname || changes.typeCatname || changes.yearsCatname) {
      this.params$.next({
        ratingCatname: this.ratingCatname,
        typeCatname: this.typeCatname,
        yearsCatname: this.yearsCatname
      });
    }

    if (changes.brandID) {
      this.brandID$.next(this.brandID);
    }
  }

  ngOnInit(): void {
    this.sub = combineLatest([
      this.params$.pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30)
      ),
      this.brandID$.pipe(
        switchMap(brandID => this.mostsService.getMenu(brandID)),
        tap(menu => {
          this.years = menu.years;
          this.ratings = menu.ratings;
          this.vehilceTypes = vehicleTypesToList(menu.vehilce_types);
          this.defaultTypeCatname = this.vehilceTypes[0].catname;
        })
      )
    ])
      .pipe(
        map(([params, menu]) => {
          if (!params.ratingCatname) {
            params.ratingCatname = menu.ratings[0].catname;
          }

          this.ratingCatname = params.ratingCatname;
          this.typeCatname = params.typeCatname;
          this.yearsCatname = params.yearsCatname;

          this.initPageEnv();

          return params;
        }),
        switchMap(params =>
          this.brandID$.pipe(
            switchMap(brandID => this.mostsService.getItems({
              rating_catname: params.ratingCatname,
              type_catname: params.typeCatname,
              years_catname: params.yearsCatname,
              brand_id: brandID
            }))
          )
        )
      )
      .subscribe(response => {
        this.items = response.items;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private initPageEnv() {
    this.pageEnv.set({
      layout: {
        needRight: false
      },
      nameTranslated: $localize `Mostly`,
      pageId: 21
    });
  }

  public getUnitTranslation(id: number, type: string): string {
    return getUnitTranslation(id, type);
  }
}
