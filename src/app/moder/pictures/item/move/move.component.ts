import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../../../services/api.service';
import { Subscription, of, combineLatest, BehaviorSubject } from 'rxjs';
import { PictureItemService } from '../../../../services/picture-item';
import { ItemService, APIItem } from '../../../../services/item';
import { chunk } from '../../../../chunk';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ItemParentService,
  APIItemParent
} from '../../../../services/item-parent';
import { PageEnvService } from '../../../../services/page-env.service';
import {
  switchMap,
  distinctUntilChanged,
  debounceTime,
  tap, map
} from 'rxjs/operators';
import { PictureService, APIPicture } from '../../../../services/picture';

// Acl.inheritsRole( 'moder', 'unauthorized' );

export interface PictureItemMoveSelection {
  itemId: number;
  perspectiveId: number;
  type: number;
}

@Component({
  selector: 'app-moder-pictures-item-move',
  templateUrl: './move.component.html'
})
@Injectable()
export class ModerPicturesItemMoveComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private id: number;
  public picture: APIPicture;
  public conceptsExpanded = false;
  public srcItemID: number;
  public srcType: number;
  public showMuseums: boolean;
  public showFactories: boolean;
  public showPersons: boolean;
  public showAuthors: boolean;
  public museumsPaginator: APIPaginator;
  public factoriesPaginator: APIPaginator;
  public brandsPaginator: APIPaginator;
  public authorsPaginator: APIPaginator;
  public brandID: number;
  public museums: APIItem[] = [];
  public factories: APIItem[] = [];
  public vehicles: APIItemParent[] = [];
  public engines: APIItemParent[] = [];
  public authors: APIItem[] = [];
  public personsPaginator: APIPaginator;
  public persons: APIItem[] = [];
  public concepts: APIItemParent[] = [];
  public brands: APIItem[][] = [];

  public showCopyrights: boolean;
  public copyrights: APIItem[] = [];
  public copyrightsPaginator: APIPaginator;

  public searchBrand: string;
  public searchBrand$ = new BehaviorSubject<string>('');
  public searchPerson: string;
  public searchPerson$ = new BehaviorSubject<string>('');
  public searchAuthor: string;
  public searchAuthor$ = new BehaviorSubject<string>('');

  constructor(
    private pictureItemService: PictureItemService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private itemParentService: ItemParentService,
    private pageEnv: PageEnvService,
    private pictureService: PictureService
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.route.paramMap.pipe(
        map(params => parseInt(params.get('id'), 10)),
        distinctUntilChanged(),
        debounceTime(10),
        tap(id => {
          this.id = id;
        }),
        switchMap(id => this.pictureService.getPicture(id)),
        tap(data => {
          this.picture = data;
          this.pageEnv.set({
            layout: {
              isAdminPage: true,
              needRight: false
            },
            name: 'page/149/name',
            pageId: 149
          });
        })
      ),
      this.route.queryParamMap.pipe(
        map(params => ({
          src_item_id: parseInt(params.get('src_item_id'), 10),
          src_type: parseInt(params.get('src_type'), 10),
          show_museums: !!params.get('show_museums'),
          show_factories: !!params.get('show_factories'),
          show_persons: !!params.get('show_persons'),
          show_authors: !!params.get('show_authors'),
          show_copyrights: !!params.get('show_copyrights'),
          brand_id: parseInt(params.get('brand_id'), 10),
          page: parseInt(params.get('page'), 10)
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(params => {
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

          let museums$ = of(null);
          if (this.showMuseums) {
            museums$ = this.itemService
              .getItems({
                type_id: 7,
                fields: 'name_html',
                limit: 50,
                page: params.page
              })
              .pipe(
                tap(response => {
                  this.museums = response.items;
                  this.museumsPaginator = response.paginator;
                })
              );
          }

          let factories$ = of(null);
          if (this.showFactories) {
            factories$ = this.itemService
              .getItems({
                type_id: 6,
                fields: 'name_html',
                limit: 50,
                page: params.page
              })
              .pipe(
                tap(response => {
                  this.factories = response.items;
                  this.factoriesPaginator = response.paginator;
                })
              );
          }

          let persons$ = of(null);
          if (this.showPersons) {
            persons$ = this.searchPerson$.pipe(
              distinctUntilChanged(),
              debounceTime(30),
              switchMap(search =>
                this.itemService.getItems({
                  type_id: 8,
                  fields: 'name_html',
                  limit: 50,
                  name: search ? '%' + search + '%' : null,
                  page: params.page
                })
              ),
              tap(response => {
                this.persons = response.items;
                this.personsPaginator = response.paginator;
              })
            );
          }

          let authors$ = of(null);
          if (this.showAuthors) {
            authors$ = this.searchAuthor$.pipe(
              distinctUntilChanged(),
              debounceTime(30),
              switchMap(search =>
                this.itemService.getItems({
                  type_id: 8,
                  fields: 'name_html',
                  limit: 50,
                  name: search ? '%' + search + '%' : null,
                  page: params.page
                })
              ),
              tap(response => {
                this.authors = response.items;
                this.authorsPaginator = response.paginator;
              })
            );
          }

          let copyrights$ = of(null);
          if (this.showCopyrights) {
            copyrights$ = this.itemService
              .getItems({
                type_id: 9,
                fields: 'name_html',
                limit: 50,
                page: params.page
              })
              .pipe(
                tap(response => {
                  this.copyrights = response.items;
                  this.copyrightsPaginator = response.paginator;
                })
              );
          }

          let brandItems$ = of(null);
          let brands$ = of(null);
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
                  .getItems({
                    item_type_id: 1,
                    parent_id: this.brandID,
                    fields: 'item.name_html,item.childs_count',
                    limit: 500,
                    page: 1
                  })
                  .pipe(tap(response => (this.vehicles = response.items))),
                this.itemParentService
                  .getItems({
                    item_type_id: 2,
                    parent_id: this.brandID,
                    fields: 'item.name_html,item.childs_count',
                    limit: 500,
                    page: 1
                  })
                  .pipe(tap(response => (this.engines = response.items))),

                this.itemParentService
                  .getItems({
                    item_type_id: 1,
                    concept: true,
                    ancestor_id: this.brandID,
                    fields: 'item.name_html,item.childs_count',
                    limit: 500,
                    page: 1
                  })
                  .pipe(tap(response => (this.concepts = response.items)))
              ]);
            } else {
              brands$ = this.searchBrand$.pipe(
                distinctUntilChanged(),
                debounceTime(30),
                switchMap(search =>
                  this.itemService.getItems({
                    type_id: 5,
                    fields: 'name_html',
                    limit: 200,
                    name: search ? '%' + search + '%' : null,
                    page: params.page
                  })
                ),
                tap(response => {
                  this.brands = chunk<APIItem>(response.items, 6);
                  this.brandsPaginator = response.paginator;
                })
              );
            }
          }

          return combineLatest([
            museums$,
            factories$,
            persons$,
            authors$,
            copyrights$,
            brandItems$,
            brands$
          ]);
        })
      )
    ]).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public selectItem(selection: PictureItemMoveSelection) {
    const dstItemID = selection.itemId;
    const dstPerspectiveID = selection.perspectiveId;

    if (this.srcItemID && this.srcType) {
      this.pictureItemService
        .changeItem(this.id, this.srcType, this.srcItemID, dstItemID)
        .pipe(
          switchMap(() => {
            if (!dstPerspectiveID) {
              return of(null);
            }

            return this.pictureItemService.setPerspective(
              this.id,
              dstItemID,
              this.srcType,
              dstPerspectiveID
            );
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
        perspective_id: dstPerspectiveID ? dstPerspectiveID : null
      };

      this.pictureItemService
        .create(this.id, dstItemID, selection.type, data)
        .subscribe(() => {
          if (localStorage) {
            localStorage.setItem('last_item', dstItemID.toString());
          }
          this.router.navigate(['/moder/pictures', this.id]);
        });
    }

    return false;
  }

  public toggleConcepts() {
    this.conceptsExpanded = !this.conceptsExpanded;
    return false;
  }

  public doSearchBrand() {
    this.searchBrand$.next(this.searchBrand);
  }

  public doSearchPerson() {
    this.searchPerson$.next(this.searchPerson);
  }

  public doSearchAuthor() {
    this.searchAuthor$.next(this.searchAuthor);
  }
}
