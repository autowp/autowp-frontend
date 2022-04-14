import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  HostListener, Output, EventEmitter
} from '@angular/core';
import { BehaviorSubject, Subscription, of, Observable } from 'rxjs';
import {
  switchMap,
  tap,
  debounceTime,
  distinctUntilChanged, map
} from 'rxjs/operators';
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

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  @Input() set filter(filter: APIGalleryFilter) { this.filter$.next(filter); };
  private filter$ = new BehaviorSubject<APIGalleryFilter>(null);

  @Input() set current(current: string) { this.current$.next(current); };
  public current$ = new BehaviorSubject<string>(null);

  @Input() galleryPrefix: string[];
  @Input() picturePrefix: string[];
  @Output() pictureSelected = new EventEmitter<APIGalleryItem>();

  public gallery: APIGalleryItem[] = [];
  private status: string;
  public currentFilter: APIGalleryFilter;
  public currentItemIndex: number;
  public currentItem: APIGalleryItem;
  public prevGalleryItem: APIGalleryItem;
  public nextGalleryItem: APIGalleryItem;

  private PER_PAGE = 10;
  public MAX_INDICATORS = 30;

  private sub: Subscription;

  constructor(private api: APIService, private router: Router) {}

  @HostListener('document:keydown.escape', ['current', '$event'])
  onKeydownHandler(current: string, event: KeyboardEvent) {
    this.router.navigate(this.picturePrefix.concat([current]));
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  onRightKeydownHandler(event: KeyboardEvent) {
    if (this.currentItemIndex + 1 < this.gallery.length) {
      this.navigateToIndex(this.currentItemIndex + 1);
    }
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  onLeftKeydownHandler(event: KeyboardEvent) {
    if (this.currentItemIndex > 0) {
      this.navigateToIndex(this.currentItemIndex - 1);
    }
  }

  ngOnInit(): void {
    this.sub = this.filter$
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(50),
        tap(filter => {
          this.gallery = [];
          this.currentFilter = filter;
        }),
        switchMap(filter => this.current$.pipe(
          map(current => ({ filter, current }))
        )),
        distinctUntilChanged(),
        switchMap(data => {
          if (!this.getGalleryItem(data.current)) {
            const params = this.filterParams(data.filter);
            params.picture_identity = data.current;
            return this.api
              .request<APIGallery>('GET', 'gallery', {
                params
              })
              .pipe(
                tap(response => {
                  this.applyResponse(response);
                }),
                map(() => ({ filter: data.filter, identity: data.current }))
              );
          }
          return of({ filter: data.filter, identity: data.current });
        }),
        tap((data) => {
          const index = this.getGalleryItemIndex(data.identity);
          this.currentItemIndex = index;

          this.prevGalleryItem = this.getGalleryItemByIndex(index - 1);
          this.currentItem = this.getGalleryItemByIndex(index);
          this.pictureSelected.emit(this.currentItem);
          this.nextGalleryItem = this.getGalleryItemByIndex(index + 1);
        })
      )
      .subscribe();
  }

  private filterParams(filter: APIGalleryFilter): { [key: string]: string; } {
    const params: { [key: string]: string; } = {};
    if (filter.itemID) {
      params.item_id = filter.itemID.toString();
    }
    if (filter.exactItemID) {
      params.exact_item_id = filter.exactItemID.toString();
    }
    if (filter.exactItemLinkType) {
      params.exact_item_link_type = filter.exactItemLinkType.toString();
    }
    if (filter.perspectiveID) {
      params.perspective_id = filter.perspectiveID.toString();
    }
    if (filter.perspectiveExclude) {
      params.perspective_exclude = filter.perspectiveExclude;
    }
    return params;
  }

  private applyResponse(response: APIGallery) {
    if (this.gallery.length < response.count) {
      this.gallery[response.count - 1] = null;
      this.status = response.status;
    }

    for (let i = 0; i < response.items.length; i++) {
      const index = (response.page - 1) * this.PER_PAGE + i;
      this.gallery[index] = response.items[i];
    }
  }

  private loadPage(filter: APIGalleryFilter, page: number): Observable<APIGallery> {
    const params = this.filterParams(filter);
    params.status = this.status;
    params.page = page + '';
    return this.api
      .request<APIGallery>('GET', 'gallery', {params})
      .pipe(
        tap((response) => {
          this.applyResponse(response);
        })
      );
  }

  private getGalleryPageNumberByIndex(index) {
    return Math.floor(index / this.PER_PAGE) + 1;
  }

  public navigateToIndex(index): boolean {
    const item = this.getGalleryItemByIndex(index);
    if (!item) {
      const page = this.getGalleryPageNumberByIndex(index);
      let success = false;
      this.loadPage(this.currentFilter, page).subscribe(() => {
        const sitem = this.getGalleryItemByIndex(index);
        if (sitem) {
          this.router.navigate(this.galleryPrefix.concat([sitem.identity]));
          success = true;
        }
      });
      return success;
    }

    this.router.navigate(this.galleryPrefix.concat([item.identity]));

    return false;
  }

  private getGalleryItemIndex(identity: string): number {
    for (let index = 0; index < this.gallery.length; index++) {
      const item = this.gallery[index];
      if (item && item.identity === identity) {
        return index;
      }
    }

    return -1;
  }

  private getGalleryItemByIndex(index: number): APIGalleryItem {
    if (index < 0 || index >= this.gallery.length) {
      return null;
    }

    if (!this.gallery[index]) {
      return null;
    }

    return this.gallery[index];
  }

  private getGalleryItem(identity: string): APIGalleryItem {
    const index = this.getGalleryItemIndex(identity);
    if (index < 0) {
      return null;
    }

    return this.getGalleryItemByIndex(index);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
