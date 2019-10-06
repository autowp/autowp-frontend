import {
  Component,
  Injectable,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, of, Observable } from 'rxjs';
import {
  switchMap,
  tap,
  debounceTime,
  distinctUntilChanged, map
} from 'rxjs/operators';
import { APIGalleryItem, APIGallery } from './definitions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
@Injectable()
export class GalleryComponent implements OnInit, OnDestroy, OnChanges {
  @Input() itemID: number = undefined;
  @Input() current: string;
  @Input() galleryPrefix: string[];
  @Input() picturePrefix: string[];

  private itemID$ = new BehaviorSubject<number>(null);
  private current$ = new BehaviorSubject<string>(null);
  public gallery: APIGalleryItem[] = [];
  private status: string;
  public currentItemID: number;
  public currentItemIndex: number;
  public currentItem: APIGalleryItem;
  public prevGalleryItem: APIGalleryItem;
  public nextGalleryItem: APIGalleryItem;

  private PER_PAGE = 10;
  public MAX_INDICATORS = 30;

  private sub: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.router.navigate(this.picturePrefix.concat([this.current]));
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
    this.sub = this.itemID$
      .pipe(
        distinctUntilChanged(),
        debounceTime(50),
        tap((itemID) => {
          this.gallery = [];
        }),
        tap((itemID) => {
          this.currentItemID = itemID;
        }),
        switchMap(itemID => this.current$.pipe(
          map(current => ({ itemID, current }))
        )),
        distinctUntilChanged(),
        switchMap(data => {
          this.current = data.current;
          if (!this.getGalleryItem(data.current)) {
            return this.http
              .get<APIGallery>('/api/item/' + data.itemID + '/gallery', {
                params: {
                  picture_identity: data.current
                }
              })
              .pipe(
                tap(response => {
                  this.applyResponse(response);
                }),
                map(response => ({ itemID: data.itemID, identity: data.current }))
              );
          }
          return of({ itemID: data.itemID, identity: data.current });
        }),
        tap((data) => {
          const index = this.getGalleryItemIndex(data.identity);
          this.currentItemIndex = index;

          this.prevGalleryItem = this.getGalleryItemByIndex(index - 1);
          this.currentItem = this.getGalleryItemByIndex(index);
          this.nextGalleryItem = this.getGalleryItemByIndex(index + 1);
        })
      )
      .subscribe();
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

  private loadPage(itemID: number, page: number): Observable<APIGallery> {
    return this.http
      .get<APIGallery>('/api/item/' + itemID + '/gallery', {
        params: {
          page: page + '',
          status: this.status
        }
      })
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
      this.loadPage(this.currentItemID, page).subscribe(() => {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.itemID) {
      this.itemID$.next(changes.itemID.currentValue);
    }

    if (changes.current) {
      this.current$.next(changes.current.currentValue);
    }
  }
}
