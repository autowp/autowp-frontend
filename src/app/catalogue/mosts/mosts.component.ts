import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import {EMPTY, of, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime, map, switchMap
} from 'rxjs/operators';
import {APIItem, ItemService} from '../../services/item';


@Component({
  selector: 'app-catalogue-mosts',
  templateUrl: './mosts.component.html'
})
@Injectable()
export class CatalogueMostsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public ratingCatname: string;
  public typeCatname: string;
  public yearsCatname: string;
  public brand: APIItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.getBrand().pipe(
      switchMap(brand => {
        this.brand = brand;
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          pageId: 208,
          name: 'page/208/ng-name',
          args: {
            brand: brand.name_text,
          }
        });

        return this.route.paramMap.pipe(
          map(params => ({
            ratingCatname: params.get('rating_catname'),
            typeCatname: params.get('type_catname'),
            yearsCatname: params.get('years_catname')
          })),
          distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
          debounceTime(30),
        ).pipe(
          map(params => ({
            brand,
            ratingCatname: params.ratingCatname,
            typeCatname: params.typeCatname,
            yearsCatname: params.yearsCatname
          }))
        );
      }),
    )
    .subscribe(data => {
      this.ratingCatname = data.ratingCatname;
      this.typeCatname = data.typeCatname;
      this.yearsCatname = data.yearsCatname;
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  private getBrand() {
    return this.route.paramMap.pipe(
      map(params => params.get('brand')),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(catname => {
        if (!catname) {
          return EMPTY;
        }
        return this.itemService.getItems({
          catname,
          fields: 'catname,name_text,name_html',
          limit: 1
        }).pipe(
          switchMap(response => {
            if (response.items.length <= 0) {
              this.router.navigate(['/error-404'], {
                skipLocationChange: true
              });
              return EMPTY;
            }
            return of(response.items[0]);
          })
        );
      })
    );
  }
}
