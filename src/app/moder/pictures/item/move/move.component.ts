import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemFields, ItemType, ListItemsRequest, Pages, PictureItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIItemParentGetResponse, ItemParentService} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {PictureItemService} from '@services/picture-item';
import {Observable, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap} from 'rxjs/operators';

import {chunk} from '../../../../chunk';

export interface PictureItemMoveSelection {
  itemId: string;
  perspectiveId: number;
  type: PictureItemType;
}

interface SrcSelection {
  id: number;
  srcItemID: number;
  srcType: PictureItemType;
}

interface SelectItemParams {
  selection: PictureItemMoveSelection;
  src: SrcSelection;
}

interface HtmlAndSelectItemParams {
  html: string;
  selection: SelectItemParams;
}

@Component({
  selector: 'app-moder-pictures-item-move',
  templateUrl: './move.component.html',
})
export class ModerPicturesItemMoveComponent implements OnInit {
  protected conceptsExpanded = false;

  private readonly srcItemID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('src_item_id') || '', 10)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  private readonly srcType$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('src_type') || '', 10) as PictureItemType),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly id$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') || '', 10)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly src$ = combineLatest([this.id$, this.srcItemID$, this.srcType$]).pipe(
    map(([id, srcItemID, srcType]) => ({id, srcItemID, srcType}) as SrcSelection),
  );

  private isSrcTypeOrEmpty$(pictureItemType: PictureItemType) {
    return this.srcType$.pipe(
      map((srcType) => !srcType || srcType === pictureItemType),
      shareReplay(1),
    );
  }

  private readonly isContentTypeOrEmpty$ = this.isSrcTypeOrEmpty$(PictureItemType.PICTURE_ITEM_CONTENT);
  protected readonly showBrands$ = this.isContentTypeOrEmpty$;
  protected readonly showFactories$ = this.isContentTypeOrEmpty$;
  protected readonly showMuseums$ = this.isContentTypeOrEmpty$;
  protected readonly showPersons$ = this.isContentTypeOrEmpty$;
  protected readonly showAuthors$ = this.isSrcTypeOrEmpty$(PictureItemType.PICTURE_ITEM_AUTHOR);
  protected readonly showCopyrights$ = this.isSrcTypeOrEmpty$(PictureItemType.PICTURE_ITEM_COPYRIGHTS);

  protected readonly showTabBar$ = combineLatest([
    this.showBrands$,
    this.showFactories$,
    this.showMuseums$,
    this.showPersons$,
    this.showAuthors$,
    this.showCopyrights$,
  ]).pipe(
    map(
      ([showBrands, showFactories, showMuseums, showPersons, showAuthors, showCopyrights]) =>
        showBrands && showFactories && showMuseums && showPersons && showAuthors && showCopyrights,
    ),
  );

  private tabActive$(param: string, pictureItemType: PictureItemType) {
    return combineLatest([
      this.isSrcTypeOrEmpty$(pictureItemType),
      this.srcItemID$,
      this.route.queryParamMap.pipe(
        map((params) => !!params.get(param)),
        distinctUntilChanged(),
      ),
    ]).pipe(
      map(([srcTypeIsContentOrEmpty, srcItemID, active]) => srcTypeIsContentOrEmpty && active && !srcItemID),
      shareReplay(1),
    );
  }

  protected readonly factoriesActive$ = this.tabActive$('show_factories', PictureItemType.PICTURE_ITEM_CONTENT);
  protected readonly museumsActive$ = this.tabActive$('show_museums', PictureItemType.PICTURE_ITEM_CONTENT);
  protected readonly personsActive$ = this.tabActive$('show_persons', PictureItemType.PICTURE_ITEM_CONTENT);

  protected readonly authorsActive$ = combineLatest([
    this.showAuthors$,
    this.src$,
    this.route.queryParamMap.pipe(
      map((params) => !!params.get('show_authors')),
      distinctUntilChanged(),
    ),
  ]).pipe(
    map(
      ([showAuthors, {srcItemID, srcType}, active]) =>
        showAuthors && !srcItemID && (active || srcType === PictureItemType.PICTURE_ITEM_AUTHOR),
    ),
    shareReplay(1),
  );

  protected readonly copyrightsActive$ = this.tabActive$('show_copyrights', PictureItemType.PICTURE_ITEM_COPYRIGHTS);

  protected readonly brandsActive$ = combineLatest([
    this.isSrcTypeOrEmpty$(PictureItemType.PICTURE_ITEM_CONTENT),
    this.factoriesActive$,
    this.museumsActive$,
    this.personsActive$,
    this.authorsActive$,
    this.copyrightsActive$,
  ]).pipe(
    map(
      ([srcTypeIsContentOrEmpty, showFactories, showMuseums, showPersons, showAuthors, showCopyrights]) =>
        srcTypeIsContentOrEmpty && !showFactories && !showMuseums && !showPersons && !showAuthors && !showCopyrights,
    ),
    shareReplay(1),
  );

  protected readonly searchBrandControl = new FormControl('');
  protected readonly searchPersonControl = new FormControl('');
  protected readonly searchAuthorControl = new FormControl('');

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly brandId$ = this.route.queryParamMap.pipe(
    map((params) => params.get('brand_id')),
    distinctUntilChanged(),
    shareReplay(1),
  );

  private getItems$(
    request: ListItemsRequest,
    selectionType: PictureItemType,
  ): Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> {
    return combineLatest([this.src$, this.itemsClient.list(new ListItemsRequest(request))]).pipe(
      map(([src, {items, paginator}]) => ({
        items: (items ? items : []).map((item) => ({
          html: item.nameHtml,
          selection: {
            selection: {
              itemId: item.id,
              perspectiveId: 0,
              type: selectionType,
            },
            src,
          },
        })),
        paginator,
      })),
    );
  }

  protected readonly museums$ = this.page$.pipe(
    switchMap((page) =>
      this.getItems$(
        new ListItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.languageService.language,
          limit: 50,
          page,
          typeId: ItemType.ITEM_TYPE_MUSEUM,
        }),
        PictureItemType.PICTURE_ITEM_CONTENT,
      ),
    ),
  );

  protected readonly factories$ = this.page$.pipe(
    switchMap((page) =>
      this.getItems$(
        new ListItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.languageService.language,
          limit: 50,
          page,
          typeId: ItemType.ITEM_TYPE_FACTORY,
        }),
        PictureItemType.PICTURE_ITEM_CONTENT,
      ),
    ),
  );

  private authorsAndPersons$(
    searchControl: FormControl<null | string>,
    selectionType: PictureItemType,
  ): Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> {
    return combineLatest([
      this.page$,
      searchControl.valueChanges.pipe(startWith(''), distinctUntilChanged(), debounceTime(30)),
    ]).pipe(
      switchMap(([page, search]) =>
        this.getItems$(
          new ListItemsRequest({
            fields: new ItemFields({nameHtml: true}),
            language: this.languageService.language,
            limit: 50,
            name: search ? '%' + search + '%' : undefined,
            page,
            typeId: ItemType.ITEM_TYPE_PERSON,
          }),
          selectionType,
        ),
      ),
    );
  }

  protected readonly persons$: Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> =
    this.authorsAndPersons$(this.searchPersonControl, PictureItemType.PICTURE_ITEM_CONTENT);

  protected readonly authors$: Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> =
    this.authorsAndPersons$(this.searchAuthorControl, PictureItemType.PICTURE_ITEM_AUTHOR);

  protected readonly copyrights$: Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> = this.page$.pipe(
    switchMap((page) =>
      this.getItems$(
        new ListItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.languageService.language,
          limit: 50,
          page,
          typeId: ItemType.ITEM_TYPE_COPYRIGHT,
        }),
        PictureItemType.PICTURE_ITEM_COPYRIGHTS,
      ),
    ),
  );

  protected readonly vehicles$: Observable<APIItemParentGetResponse> = this.brandId$.pipe(
    switchMap((brandID) =>
      this.itemParentService.getItems$({
        fields: 'item.name_html,item.childs_count',
        item_type_id: ItemType.ITEM_TYPE_VEHICLE,
        limit: 500,
        page: 1,
        parent_id: brandID ? +brandID : undefined,
      }),
    ),
  );

  protected readonly engines$: Observable<APIItemParentGetResponse> = this.brandId$.pipe(
    switchMap((brandID) =>
      this.itemParentService.getItems$({
        fields: 'item.name_html,item.childs_count',
        item_type_id: ItemType.ITEM_TYPE_ENGINE,
        limit: 500,
        page: 1,
        parent_id: brandID ? +brandID : undefined,
      }),
    ),
  );

  protected readonly concepts$: Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> = this.brandId$.pipe(
    switchMap((brandID) =>
      this.getItems$(
        new ListItemsRequest({
          ancestorId: brandID ? brandID : undefined,
          fields: new ItemFields({
            nameHtml: true,
          }),
          isConcept: true,
          language: this.languageService.language,
          limit: 500,
          page: 1,
          typeId: ItemType.ITEM_TYPE_VEHICLE,
        }),
        PictureItemType.PICTURE_ITEM_COPYRIGHTS,
      ),
    ),
  );

  protected readonly brands$: Observable<{items: APIItem[][]; paginator?: Pages}> = combineLatest([
    this.page$,
    this.searchBrandControl.valueChanges.pipe(startWith(''), distinctUntilChanged(), debounceTime(30)),
  ]).pipe(
    switchMap(([page, search]) =>
      this.itemsClient.list(
        new ListItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.languageService.language,
          limit: 200,
          name: search ? '%' + search + '%' : undefined,
          page,
          typeId: ItemType.ITEM_TYPE_BRAND,
        }),
      ),
    ),
    map((response) => ({
      items: chunk<APIItem>(response.items ? response.items : [], 6),
      paginator: response.paginator,
    })),
  );

  protected readonly PictureItemType = PictureItemType;

  constructor(
    private readonly pictureItemService: PictureItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly itemParentService: ItemParentService,
    private readonly pageEnv: PageEnvService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 149,
      });
    }, 0);
  }

  protected selectItem({selection, src: {id, srcItemID, srcType}}: SelectItemParams) {
    const dstItemID = selection.itemId;
    const dstPerspectiveID = selection.perspectiveId;

    if (srcItemID && srcType) {
      this.pictureItemService
        .changeItem$(id, srcType, srcItemID, dstItemID)
        .pipe(
          switchMap(() => {
            if (!dstPerspectiveID) {
              return of(null);
            }

            return this.pictureItemService.setPerspective$(id, +dstItemID, srcType, dstPerspectiveID);
          }),
        )
        .subscribe(() => {
          if (localStorage) {
            localStorage.setItem('last_item', dstItemID);
          }
          this.router.navigate(['/moder/pictures', id]);
        });
    } else {
      const data = {
        perspective_id: dstPerspectiveID ? dstPerspectiveID : null,
      };

      this.pictureItemService.create$(id, dstItemID, selection.type, data).subscribe(() => {
        if (localStorage) {
          localStorage.setItem('last_item', dstItemID);
        }
        this.router.navigate(['/moder/pictures', id]);
      });
    }

    return false;
  }

  protected toggleConcepts() {
    this.conceptsExpanded = !this.conceptsExpanded;
    return false;
  }
}
