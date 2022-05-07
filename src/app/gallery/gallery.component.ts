import {Component, Input, HostListener, Output, EventEmitter} from '@angular/core';
import {BehaviorSubject, of, Observable, combineLatest} from 'rxjs';
import {switchMap, tap, debounceTime, distinctUntilChanged, map, take, shareReplay} from 'rxjs/operators';
import { APIGalleryItem, APIGallery } from './definitions';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';

interface APIGalleryFilter {
  itemID?: number;
  exactItemID?: number;
  exactItemLinkType?: number;
  perspectiveID?: number;
  perspectiveExclude?: string;
}

class Gallery {

  private MAX_INDICATORS = 30;
  private PER_PAGE = 10;

  public current: number;
  public status: string;
  public get useCircleIndicator(): boolean {
    return this.items.length > this.MAX_INDICATORS;
  }

  constructor(public filter: APIGalleryFilter, public items: APIGalleryItem[]) {
  }

  public filterParams(): { [key: string]: string; } {
    const params: { [key: string]: string; } = {};
    if (this.filter.itemID) {
      params.item_id = this.filter.itemID.toString();
    }
    if (this.filter.exactItemID) {
      params.exact_item_id = this.filter.exactItemID.toString();
    }
    if (this.filter.exactItemLinkType) {
      params.exact_item_link_type = this.filter.exactItemLinkType.toString();
    }
    if (this.filter.perspectiveID) {
      params.perspective_id = this.filter.perspectiveID.toString();
    }
    if (this.filter.perspectiveExclude) {
      params.perspective_exclude = this.filter.perspectiveExclude;
    }
    return params;
  }

  public getItemIndex(identity: string): number {
    return this.items.findIndex(item => item && item.identity === identity)
  }

  public getItemByIndex(index: number): APIGalleryItem {
    if (index < 0 || index >= this.items.length) {
      return null;
    }

    if (!this.items[index]) {
      return null;
    }

    return this.items[index];
  }

  public getGalleryItem(identity: string): APIGalleryItem {
    const index = this.getItemIndex(identity);
    if (index < 0) {
      return null;
    }

    return this.getItemByIndex(index);
  }

  public applyResponse(response: APIGallery) {
    if (this.items.length < response.count) {
      this[response.count - 1] = null;
      this.status = response.status;
    }

    response.items.forEach((item, i) => {
      const index = (response.page - 1) * this.PER_PAGE + i;
      this.items[index] = item;
    });
  }

  public getGalleryPageNumberByIndex(index: number) {
    return Math.floor(index / this.PER_PAGE) + 1;
  }
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  @Input() set filter(filter: APIGalleryFilter) { this.filter$.next(filter); };
  private filter$ = new BehaviorSubject<APIGalleryFilter>(null);

  @Input() set current(current: string) { this.current$.next(current); };
  public current$ = new BehaviorSubject<string>(null);

  @Input() galleryPrefix: string[];
  @Input() picturePrefix: string[];
  @Output() pictureSelected = new EventEmitter<APIGalleryItem>();

  public currentFilter$ = this.filter$.pipe(
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    debounceTime(50),
    shareReplay(1)
  );

  public identity$ = this.current$.pipe(
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
  );

  public gallery$: Observable<Gallery> = combineLatest([
    this.currentFilter$.pipe(
      map(filter => new Gallery(filter, [] as APIGalleryItem[]))
    ),
    this.identity$
  ]).pipe(
    switchMap(([gallery, identity]) => {
      if (!gallery.getGalleryItem(identity)) {
        const params = gallery.filterParams();
        params.picture_identity = identity;
        return this.api.request<APIGallery>('GET', 'gallery', {params}).pipe(
          tap(response => {
            gallery.applyResponse(response);
          }),
          map(() => ({gallery, identity}))
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
    map(({gallery, identity}) => gallery),
    shareReplay(1)
  );

  constructor(private api: APIService, private router: Router) {}

  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    this.current$.pipe(
      take(1),
      switchMap(current => this.router.navigate(this.picturePrefix.concat([current])))
    ).subscribe();
  }

  @HostListener('document:keydown.arrowright')
  onRightKeydownHandler() {
    this.gallery$.pipe(
      take(1),
    ).subscribe( gallery => {
      if (gallery.current + 1 < gallery.items.length) {
        this.navigateToIndex(gallery.current + 1, gallery);
      }
    });
  }

  @HostListener('document:keydown.arrowleft')
  onLeftKeydownHandler() {
    this.gallery$.pipe(
      take(1),
    ).subscribe( gallery => {
      if (gallery.current > 0) {
        this.navigateToIndex(gallery.current - 1, gallery);
      }
    });
  }

  private loadPage(page: number, gallery: Gallery): Observable<APIGallery> {
    const params = gallery.filterParams();
    params.status = gallery.status;
    params.page = page + '';
    return this.api.request<APIGallery>('GET', 'gallery', {params}).pipe(
      tap((response) => {
        gallery.applyResponse(response);
      })
    );
  }

  public navigateToIndex(index, gallery: Gallery): Promise<boolean> {
    const item = gallery.getItemByIndex(index);
    if (!item) {
      const page = gallery.getGalleryPageNumberByIndex(index);
      this.loadPage(page, gallery).subscribe(() => {
        const sitem = gallery.getItemByIndex(index);
        if (sitem) {
          return this.router.navigate(this.galleryPrefix.concat([sitem.identity]));
        }
      });
    }

    return this.router.navigate(this.galleryPrefix.concat([item.identity]));
  }
}
