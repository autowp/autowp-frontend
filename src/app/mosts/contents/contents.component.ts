import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {PageEnvService} from '@services/page-env.service';
import {APIVehicleType} from '@services/vehicle-type';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {
  getMostsPeriodsTranslation,
  getMostsRatingParamsTranslation,
  getMostsRatingsTranslation,
  getUnitAbbrTranslation,
  getUnitNameTranslation,
  getVehicleTypeRpTranslation,
} from '@utils/translations';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {APIMostsItem, MostsService} from '../mosts.service';

function vehicleTypesToList(vehicleTypes: APIVehicleType[]): APIVehicleType[] {
  const result: APIVehicleType[] = [];
  for (const item of vehicleTypes) {
    result.push(item);
    item.nameTranslated = getVehicleTypeRpTranslation(item.name);
    for (const child of item.childs) {
      child.nameTranslated = getVehicleTypeRpTranslation(child.name);
      result.push(child);
    }
  }

  return result;
}

@Component({
  imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, RouterLink, MarkdownComponent, NgbTooltip, AsyncPipe],
  selector: 'app-mosts-contents',
  styleUrls: ['./styles.scss'],
  templateUrl: './contents.component.html',
})
export class MostsContentsComponent {
  readonly #mostsService = inject(MostsService);
  readonly #pageEnv = inject(PageEnvService);

  @Input() prefix: string[] = ['/mosts'];

  @Input() set ratingCatname(ratingCatname: null | string) {
    this.ratingCatname$.next(ratingCatname);
  }
  protected readonly ratingCatname$ = new BehaviorSubject<null | string>(null);

  protected readonly ratingCatnameNormalized$ = this.ratingCatname$.pipe(
    switchMap((ratingCatname) =>
      this.#menu$.pipe(map((menu) => (ratingCatname ? ratingCatname : menu.ratings[0].catname))),
    ),
  );

  @Input() set typeCatname(typeCatname: null | string) {
    this.typeCatname$.next(typeCatname);
  }
  protected readonly typeCatname$ = new BehaviorSubject<null | string>(null);

  @Input() set yearsCatname(yearsCatname: null | string) {
    this.yearsCatname$.next(yearsCatname);
  }
  protected readonly yearsCatname$ = new BehaviorSubject<null | string>(null);

  @Input() set brandID(brandID: number) {
    this.brandID$.next(brandID);
  }
  protected readonly brandID$ = new BehaviorSubject<null | number>(null);

  readonly #menu$ = this.brandID$.pipe(
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((brandID) => this.#mostsService.getMenu$(brandID ?? 0)),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly years$ = this.#menu$.pipe(map((menu) => menu.years));

  protected readonly ratings$ = this.#menu$.pipe(map((menu) => menu.ratings));

  protected readonly vehicleTypes$ = this.#menu$.pipe(
    map((menu) => vehicleTypesToList(menu.vehilce_types)),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly defaultTypeCatname$ = this.vehicleTypes$.pipe(map((vehicleTypes) => vehicleTypes[0].catname));

  protected readonly items$: Observable<APIMostsItem[]> = combineLatest([
    this.ratingCatnameNormalized$.pipe(distinctUntilChanged(), debounceTime(10)),
    this.typeCatname$.pipe(distinctUntilChanged(), debounceTime(10)),
    this.yearsCatname$.pipe(distinctUntilChanged(), debounceTime(10)),
  ]).pipe(
    tap(() => {
      this.initPageEnv();
    }),
    switchMap(([ratingCatname, typeCatname, yearsCatname]) =>
      this.brandID$.pipe(
        switchMap((brandID) =>
          this.#mostsService.getItems$({
            brand_id: brandID ?? 0,
            rating_catname: ratingCatname,
            type_catname: typeCatname ?? '',
            years_catname: yearsCatname ?? '',
          }),
        ),
      ),
    ),
    map((response) => response.items),
  );

  private initPageEnv() {
    this.#pageEnv.set({pageId: 21});
  }

  protected getUnitAbbrTranslation(id: string): string {
    return getUnitAbbrTranslation(id);
  }

  protected getUnitNameTranslation(id: string): string {
    return getUnitNameTranslation(id);
  }

  protected getMostsRatingsTranslation(id: string): string {
    return getMostsRatingsTranslation(id);
  }

  protected getMostsRatingParamsTranslation(id: string): string {
    return getMostsRatingParamsTranslation(id);
  }

  protected getMostsPeriodsTranslation(id: string): string {
    return getMostsPeriodsTranslation(id);
  }
}
