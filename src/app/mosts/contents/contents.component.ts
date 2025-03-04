import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MostsItem, MostsItemsRequest, MostsVehicleType} from '@grpc/spec.pb';
import {MostsClient} from '@grpc/spec.pbsc';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
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

import {MostsService} from '../mosts.service';

export interface MostsVehicleTypeTranslated extends MostsVehicleType.AsObject {
  nameTranslated?: string;
}

function vehicleTypesToList(vehicleTypes: MostsVehicleType[]): MostsVehicleTypeTranslated[] {
  const result: MostsVehicleTypeTranslated[] = [];
  for (const item of vehicleTypes) {
    result.push({...item.toObject(), nameTranslated: getVehicleTypeRpTranslation(item.nameRp)});
    for (const child of item.childs || []) {
      result.push({...child.toObject(), nameTranslated: getVehicleTypeRpTranslation(child.nameRp)});
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
  readonly #mostsClient = inject(MostsClient);
  readonly #languageService = inject(LanguageService);

  @Input() prefix: string[] = ['/mosts'];

  @Input() set ratingCatname(ratingCatname: null | string) {
    this.ratingCatname$.next(ratingCatname);
  }
  protected readonly ratingCatname$ = new BehaviorSubject<null | string>(null);

  protected readonly ratingCatnameNormalized$ = this.ratingCatname$.pipe(
    switchMap((ratingCatname) =>
      this.#menu$.pipe(map((menu) => (ratingCatname ? ratingCatname : (menu.ratings || [])[0].catname))),
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

  @Input() set brandID(brandID: string) {
    this.brandID$.next(brandID);
  }
  protected readonly brandID$ = new BehaviorSubject<string | undefined>(undefined);

  readonly #menu$ = this.brandID$.pipe(
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((brandID) => this.#mostsService.getMenu$(brandID)),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly years$ = this.#menu$.pipe(map((menu) => menu.years));

  protected readonly ratings$ = this.#menu$.pipe(map((menu) => menu.ratings));

  protected readonly vehicleTypes$: Observable<MostsVehicleTypeTranslated[]> = this.#menu$.pipe(
    map((menu) => vehicleTypesToList(menu.vehicleTypes || [])),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly defaultTypeCatname$ = this.vehicleTypes$.pipe(map((vehicleTypes) => vehicleTypes[0].catname));

  protected readonly items$: Observable<MostsItem[]> = combineLatest([
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
          this.#mostsClient.getItems(
            new MostsItemsRequest({
              brandId: brandID,
              language: this.#languageService.language,
              ratingCatname: ratingCatname,
              typeCatname: typeCatname || '',
              yearsCatname: yearsCatname || '',
            }),
          ),
        ),
      ),
    ),
    map((response) => response.items || []),
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
