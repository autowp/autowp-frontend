import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, HostListener, inject, Input, Output} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {APIService} from '@services/api.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, take, tap} from 'rxjs/operators';

import {CarouselItemComponent} from './carousel-item.component';
import {APIGallery, APIGalleryItem} from './definitions';

export interface APIGalleryFilter {
  exactItemID?: string;
  exactItemLinkType?: number;
  itemID?: string;
  perspectiveExclude?: number[];
  perspectiveID?: number;
}

class Gallery {
  readonly #MAX_INDICATORS = 30;
  readonly #PER_PAGE = 10;

  public current: number = 0;
  public status: string = '';
  public get useCircleIndicator(): boolean {
    return this.items.length <= this.#MAX_INDICATORS;
  }

  constructor(
    public readonly filter: APIGalleryFilter,
    public readonly items: (APIGalleryItem | null)[],
  ) {}

  public filterParams(): {[key: string]: string} {
    const params: {[key: string]: string} = {};
    if (this.filter.itemID) {
      params['item_id'] = this.filter.itemID;
    }
    if (this.filter.exactItemID) {
      params['exact_item_id'] = this.filter.exactItemID;
    }
    if (this.filter.exactItemLinkType) {
      params['exact_item_link_type'] = this.filter.exactItemLinkType.toString();
    }
    if (this.filter.perspectiveID) {
      params['perspective_id'] = this.filter.perspectiveID.toString();
    }
    if (this.filter.perspectiveExclude) {
      params['perspective_exclude'] = this.filter.perspectiveExclude.join(',');
    }
    return params;
  }

  public getItemIndex(identity: string): number {
    return this.items.findIndex((item) => item && item.identity === identity);
  }

  public getItemByIndex(index: number): APIGalleryItem | null {
    if (index < 0 || index >= this.items.length) {
      return null;
    }

    if (!this.items[index]) {
      return null;
    }

    return this.items[index];
  }

  public getGalleryItem(identity: string): APIGalleryItem | null {
    const index = this.getItemIndex(identity);
    if (index < 0) {
      return null;
    }

    return this.getItemByIndex(index);
  }

  public applyResponse(response: APIGallery) {
    if (this.items.length < response.count) {
      this.items[response.count - 1] = null;
      this.status = response.status;
    }

    response.items.forEach((item, i) => {
      const index = (response.page - 1) * this.#PER_PAGE + i;
      this.items[index] = item;
    });
  }

  public getGalleryPageNumberByIndex(index: number) {
    return Math.floor(index / this.#PER_PAGE) + 1;
  }
}

@Component({
  imports: [CarouselItemComponent, RouterLink, AsyncPipe],
  selector: 'app-gallery',
  styleUrls: ['./gallery.component.scss'],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  readonly #api = inject(APIService);
  readonly #router = inject(Router);

  @Input() set filter(filter: APIGalleryFilter) {
    this.#filter$.next(filter);
  }
  readonly #filter$ = new BehaviorSubject<APIGalleryFilter | null>(null);

  @Input() set current(current: null | string) {
    this.current$.next(current);
  }
  public readonly current$ = new BehaviorSubject<null | string>(null);

  @Input() galleryPrefix: string[] = [];
  @Input() picturePrefix: string[] = [];
  @Output() pictureSelected = new EventEmitter<APIGalleryItem | null>();

  protected readonly currentFilter$ = this.#filter$.pipe(
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    debounceTime(50),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly identity$ = this.current$.pipe(
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly gallery$: Observable<Gallery> = combineLatest([
    this.currentFilter$.pipe(switchMap((filter) => (filter ? of(new Gallery(filter, [] as APIGalleryItem[])) : EMPTY))),
    this.identity$.pipe(switchMap((identity) => (identity ? of(identity) : EMPTY))),
  ]).pipe(
    switchMap(([gallery, identity]) => {
      if (!gallery.getGalleryItem(identity)) {
        const params = gallery.filterParams();
        params['picture_identity'] = identity;
        return this.#api.request$<APIGallery>('GET', 'gallery', {params}).pipe(
          tap((response) => {
            gallery.applyResponse(response);
          }),
          map(() => ({gallery, identity})),
        );
      }
      return of({gallery, identity});
    }),
    tap(({gallery, identity}) => {
      const index = gallery.getItemIndex(identity);
      gallery.current = index;
      const currentItem = gallery.getItemByIndex(index);
      this.pictureSelected.emit(currentItem);
    }),
    map(({gallery}) => gallery),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    this.current$
      .pipe(
        take(1),
        switchMap((current) => (current ? this.#router.navigate(this.picturePrefix.concat([current])) : EMPTY)),
      )
      .subscribe();
  }

  @HostListener('document:keydown.arrowright')
  onRightKeydownHandler() {
    this.gallery$.pipe(take(1)).subscribe((gallery) => {
      if (gallery.current + 1 < gallery.items.length) {
        this.navigateToIndex(gallery.current + 1, gallery);
      }
    });
  }

  @HostListener('document:keydown.arrowleft')
  onLeftKeydownHandler() {
    this.gallery$.pipe(take(1)).subscribe((gallery) => {
      if (gallery.current > 0) {
        this.navigateToIndex(gallery.current - 1, gallery);
      }
    });
  }

  private loadPage$(page: number, gallery: Gallery): Observable<APIGallery> {
    const params = gallery.filterParams();
    params['status'] = gallery.status;
    params['page'] = page + '';
    return this.#api.request$<APIGallery>('GET', 'gallery', {params}).pipe(
      tap((response) => {
        gallery.applyResponse(response);
      }),
    );
  }

  protected navigateToIndex(index: number, gallery: Gallery): void {
    const item = gallery.getItemByIndex(index);
    if (item) {
      this.#router.navigate(this.galleryPrefix.concat([item.identity]));
      return;
    }

    const page = gallery.getGalleryPageNumberByIndex(index);
    this.loadPage$(page, gallery).subscribe(() => {
      const sitem = gallery.getItemByIndex(index);
      if (sitem) {
        this.#router.navigate(this.galleryPrefix.concat([sitem.identity]));
      }
    });
  }
}
