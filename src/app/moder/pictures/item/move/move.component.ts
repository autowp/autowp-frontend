import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {APIPaginator} from '@services/api.service';
import {APIItem, APIItemsGetResponse, ItemService} from '@services/item';
import {APIItemParent, ItemParentService} from '@services/item-parent';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {PictureItemService} from '@services/picture-item';
import {BehaviorSubject, Observable, Subscription, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {chunk} from '../../../../chunk';

export interface PictureItemMoveSelection {
  itemId: number;
  perspectiveId: number;
  type: number;
}

@Component({
  selector: 'app-moder-pictures-item-move',
  templateUrl: './move.component.html',
})
export class ModerPicturesItemMoveComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private id: number;
  protected picture: APIPicture;
  protected conceptsExpanded = false;
  protected srcItemID: number;
  protected srcType: number;
  protected showMuseums: boolean;
  protected showFactories: boolean;
  protected showPersons: boolean;
  protected showAuthors: boolean;
  protected museumsPaginator: APIPaginator;
  protected factoriesPaginator: APIPaginator;
  protected brandsPaginator: APIPaginator;
  protected authorsPaginator: APIPaginator;
  protected brandID: number;
  protected museums: APIItem[] = [];
  protected factories: APIItem[] = [];
  protected vehicles: APIItemParent[] = [];
  protected engines: APIItemParent[] = [];
  protected authors: APIItem[] = [];
  protected personsPaginator: APIPaginator;
  protected persons: APIItem[] = [];
  protected concepts: APIItemParent[] = [];
  protected brands: APIItem[][] = [];

  protected showCopyrights: boolean;
  protected copyrights: APIItem[] = [];
  protected copyrightsPaginator: APIPaginator;

  protected searchBrand: string;
  protected readonly searchBrand$ = new BehaviorSubject<string>('');
  protected searchPerson: string;
  protected readonly searchPerson$ = new BehaviorSubject<string>('');
  protected searchAuthor: string;
  protected readonly searchAuthor$ = new BehaviorSubject<string>('');

  constructor(
    private readonly pictureItemService: PictureItemService,
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly itemParentService: ItemParentService,
    private readonly pageEnv: PageEnvService,
    private readonly pictureService: PictureService
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.route.paramMap.pipe(
        map((params) => parseInt(params.get('id'), 10)),
        distinctUntilChanged(),
        debounceTime(10),
        tap((id) => {
          this.id = id;
        }),
        switchMap((id) => this.pictureService.getPicture$(id)),
        tap((data) => {
          this.picture = data;
          this.pageEnv.set({
            layout: {isAdminPage: true},
            pageId: 149,
          });
        })
      ),
      this.route.queryParamMap.pipe(
        map((params) => ({
          brand_id: parseInt(params.get('brand_id'), 10),
          page: parseInt(params.get('page'), 10),
          show_authors: !!params.get('show_authors'),
          show_copyrights: !!params.get('show_copyrights'),
          show_factories: !!params.get('show_factories'),
          show_museums: !!params.get('show_museums'),
          show_persons: !!params.get('show_persons'),
          src_item_id: parseInt(params.get('src_item_id'), 10),
          src_type: parseInt(params.get('src_type'), 10),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap((params) => {
          this.srcItemID = params.src_item_id;
          this.srcType = params.src_type;

          this.showMuseums = params.show_museums;
          this.showFactories = params.show_factories;
          this.showPersons = params.show_persons;
          this.showAuthors = params.show_authors;
          this.showCopyrights = params.show_copyrights;
          this.brandID = params.brand_id;

          if (this.srcType === 2) {
            this.showAuthors = true;
          }

          let museums$: Observable<APIItemsGetResponse> = of(null);
          if (this.showMuseums) {
            museums$ = this.itemService
              .getItems$({
                fields: 'name_html',
                limit: 50,
                page: params.page,
                type_id: ItemType.ITEM_TYPE_MUSEUM,
              })
              .pipe(
                tap((response) => {
                  this.museums = response.items;
                  this.museumsPaginator = response.paginator;
                })
              );
          }

          let factories$: Observable<APIItemsGetResponse> = of(null);
          if (this.showFactories) {
            factories$ = this.itemService
              .getItems$({
                fields: 'name_html',
                limit: 50,
                page: params.page,
                type_id: ItemType.ITEM_TYPE_FACTORY,
              })
              .pipe(
                tap((response) => {
                  this.factories = response.items;
                  this.factoriesPaginator = response.paginator;
                })
              );
          }

          let persons$: Observable<APIItemsGetResponse> = of(null);
          if (this.showPersons) {
            persons$ = this.searchPerson$.pipe(
              distinctUntilChanged(),
              debounceTime(30),
              switchMap((search) =>
                this.itemService.getItems$({
                  fields: 'name_html',
                  limit: 50,
                  name: search ? '%' + search + '%' : null,
                  page: params.page,
                  type_id: ItemType.ITEM_TYPE_PERSON,
                })
              ),
              tap((response) => {
                this.persons = response.items;
                this.personsPaginator = response.paginator;
              })
            );
          }

          let authors$: Observable<APIItemsGetResponse> = of(null);
          if (this.showAuthors) {
            authors$ = this.searchAuthor$.pipe(
              distinctUntilChanged(),
              debounceTime(30),
              switchMap((search) =>
                this.itemService.getItems$({
                  fields: 'name_html',
                  limit: 50,
                  name: search ? '%' + search + '%' : null,
                  page: params.page,
                  type_id: ItemType.ITEM_TYPE_PERSON,
                })
              ),
              tap((response) => {
                this.authors = response.items;
                this.authorsPaginator = response.paginator;
              })
            );
          }

          let copyrights$: Observable<APIItemsGetResponse> = of(null);
          if (this.showCopyrights) {
            copyrights$ = this.itemService
              .getItems$({
                fields: 'name_html',
                limit: 50,
                page: params.page,
                type_id: ItemType.ITEM_TYPE_COPYRIGHT,
              })
              .pipe(
                tap((response) => {
                  this.copyrights = response.items;
                  this.copyrightsPaginator = response.paginator;
                })
              );
          }

          let brandItems$: Observable<null> = of(null);
          let brands$: Observable<null> = of(null);
          if (
            !this.showMuseums &&
            !this.showFactories &&
            !this.showPersons &&
            !this.showAuthors &&
            !this.showCopyrights
          ) {
            if (this.brandID) {
              brandItems$ = combineLatest([
                this.itemParentService
                  .getItems$({
                    fields: 'item.name_html,item.childs_count',
                    item_type_id: ItemType.ITEM_TYPE_VEHICLE,
                    limit: 500,
                    page: 1,
                    parent_id: this.brandID,
                  })
                  .pipe(tap((response) => (this.vehicles = response.items))),
                this.itemParentService
                  .getItems$({
                    fields: 'item.name_html,item.childs_count',
                    item_type_id: ItemType.ITEM_TYPE_ENGINE,
                    limit: 500,
                    page: 1,
                    parent_id: this.brandID,
                  })
                  .pipe(tap((response) => (this.engines = response.items))),

                this.itemParentService
                  .getItems$({
                    ancestor_id: this.brandID,
                    concept: true,
                    fields: 'item.name_html,item.childs_count',
                    item_type_id: ItemType.ITEM_TYPE_VEHICLE,
                    limit: 500,
                    page: 1,
                  })
                  .pipe(tap((response) => (this.concepts = response.items))),
              ]).pipe(map(() => null));
            } else {
              brands$ = this.searchBrand$.pipe(
                distinctUntilChanged(),
                debounceTime(30),
                switchMap((search) =>
                  this.itemService.getItems$({
                    fields: 'name_html',
                    limit: 200,
                    name: search ? '%' + search + '%' : null,
                    page: params.page,
                    type_id: ItemType.ITEM_TYPE_BRAND,
                  })
                ),
                tap((response) => {
                  this.brands = chunk<APIItem>(response.items, 6);
                  this.brandsPaginator = response.paginator;
                }),
                map(() => null)
              );
            }
          }

          return combineLatest([museums$, factories$, persons$, authors$, copyrights$, brandItems$, brands$]);
        })
      ),
    ]).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected selectItem(selection: PictureItemMoveSelection) {
    const dstItemID = selection.itemId;
    const dstPerspectiveID = selection.perspectiveId;

    if (this.srcItemID && this.srcType) {
      this.pictureItemService
        .changeItem$(this.id, this.srcType, this.srcItemID, dstItemID)
        .pipe(
          switchMap(() => {
            if (!dstPerspectiveID) {
              return of(null);
            }

            return this.pictureItemService.setPerspective$(this.id, dstItemID, this.srcType, dstPerspectiveID);
          })
        )
        .subscribe(() => {
          if (localStorage) {
            localStorage.setItem('last_item', dstItemID.toString());
          }
          this.router.navigate(['/moder/pictures', this.id]);
        });
    } else {
      const data = {
        perspective_id: dstPerspectiveID ? dstPerspectiveID : null,
      };

      this.pictureItemService.create$(this.id, dstItemID, selection.type, data).subscribe(() => {
        if (localStorage) {
          localStorage.setItem('last_item', dstItemID.toString());
        }
        this.router.navigate(['/moder/pictures', this.id]);
      });
    }

    return false;
  }

  protected toggleConcepts() {
    this.conceptsExpanded = !this.conceptsExpanded;
    return false;
  }

  protected doSearchBrand() {
    this.searchBrand$.next(this.searchBrand);
  }

  protected doSearchPerson() {
    this.searchPerson$.next(this.searchPerson);
  }

  protected doSearchAuthor() {
    this.searchAuthor$.next(this.searchAuthor);
  }
}
