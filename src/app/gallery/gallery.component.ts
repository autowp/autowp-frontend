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
  switchMapTo,
  distinctUntilChanged
} from 'rxjs/operators';
import {
  APIGalleryItem,
  APIGalleryResponse,
  GalleryItem,
  APIGallery
} from './definitions';
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

  private itemID$ = new BehaviorSubject<number>(null);
  private current$ = new BehaviorSubject<string>(null);
  public items: GalleryItem[];
  public gallery: GalleryItem[] = [];
  private status: string;
  public currentItemID: number;
  public currentItemIndex: number;
  public currentItem: APIGalleryItem;
  public prevGalleryItem: APIGalleryItem;
  public nextGalleryItem: APIGalleryItem;
  public indicators = [];

  private PER_PAGE = 10;
  public MAX_INDICATORS = 30;
  private count = 0;
  private pages = 0;
  private pageStatus: any[] = [];
  private url: string;

  private $e: JQuery;
  // private $carousel: JQuery;
  private $inner: JQuery;
  // private carousel: Carousel;
  public images: APIGalleryItem[] = [];
  private sub: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.router.navigate([
      '/twins/group',
      this.currentItemID,
      'pictures',
      this.current
    ]);
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
    console.log('ngOnInit');

    // this.$carousel = this.$e.find('.carousel');

    // this.$inner = this.$carousel.find('.carousel-inner');

    /* this.carousel = new Carousel(
      this.$carousel[0],
      {},
      (relatedTarget: any) => {
        const $item = $(relatedTarget);

        this.activateItem($item, true);
        this.fixArrows($item);

        const position = $item.data('position');

        this.position = position;
        this.refreshIndicator();

        this.loadSiblingPages(position);

        this.$indicators.find('li.active').removeClass('active');
        this.$indicators
          .find('li')
          .eq(position)
          .addClass('active');
      }
    ); */

    /*

    this.$carousel.on(
      'click',
      '.item .details.carousel-control',
      (event: JQueryEventObject) => {
        if ($(event.currentTarget).attr('href') === window.location.pathname) {
          this.hide();
          event.preventDefault();
        }
      }
    );

    this.$carousel.on(
      'click',
      '.item .comments.carousel-control',
      (event: JQueryEventObject) => {
        const src = window.location.pathname.replace('#comments', '');
        const href = $(event.currentTarget).attr('href');
        if (href) {
          const dst = href.replace('#comments', '');
          if (src === dst) {
            this.hide();
            const offset = $('#comments').offset();
            if (offset !== undefined) {
              $('body').scrollTop(offset.top);
            }
            event.preventDefault();
          }
        }
      }
    );

    this.$carousel.on(
      'click',
      '.item img, .item .carousel-control-full',
      (event: JQueryEventObject) => {
        const $item = $(event.currentTarget).closest('.item');
        const crop = $item.data('crop');
        if (crop) {
          const cropMode = !$item.data('cropMode');
          $item.data('cropMode', cropMode);
          if (cropMode) {
            $item.addClass('crop');
          } else {
            $item.removeClass('crop');
          }
          this.fixSize($item as any);
        }
      }
    );


    */
    // this.load(this.current);

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
        switchMapTo(this.current$, (itemID, current) => ({ itemID, current })),
        distinctUntilChanged(),
        switchMap(
          (data) => {
            this.current = data.current;
            if (!this.getGalleryItem(data.current)) {
              return this.http
                .get<APIGallery>('/api/item/' + data.itemID + '/gallery', {
                  params: {
                    picture_identity: data.current
                  }
                })
                .pipe(
                  tap((response) => {
                    this.applyResponse(response);
                  })
                );
            }
            return of(null);
          },
          (data) => ({ itemID: data.itemID, identity: data.current })
        ),
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
      this.gallery[index] = {
        item: response.items[i]
      };
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

  public navigateToIndex(index) {
    const item = this.getGalleryItemByIndex(index);
    if (!item) {
      const page = this.getGalleryPageNumberByIndex(index);
      this.loadPage(this.currentItemID, page).subscribe(() => {
        const sitem = this.getGalleryItemByIndex(index);
        if (sitem) {
          this.router.navigate([
            '/twins/group',
            this.currentItemID,
            'gallery',
            sitem.identity
          ]);
        }
      });
      return false;
    }

    this.router.navigate([
      '/twins/group',
      this.currentItemID,
      'gallery',
      item.identity
    ]);

    return false;
  }

  private getGalleryItemIndex(identity: string): number {
    for (let index = 0; index < this.gallery.length; index++) {
      const item = this.gallery[index];
      if (item && item.item.identity === identity) {
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

    return this.gallery[index].item;
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

  private loadSiblingPages(index: number) {
    const page = this.positionPage(index);
    const prevPage = page > 1 ? page - 1 : 1;
    const nextPage = page < this.pages ? page + 1 : this.pages;

    this.load(null, prevPage);
    this.load(null, nextPage);
  }

  private load(
    pictureIdentity: string | null,
    page: number = 0,
    callback?: Function
  ) {
    if (page) {
      let loaded = false;
      const status = this.pageStatus[page];
      if (status === 'loading' || status === 'loaded') {
        loaded = true;
      }
      if (loaded) {
        if (callback) {
          callback();
        }
        return;
      }

      this.pageStatus[page] = 'loading';
    }

    this.http
      .get<APIGalleryResponse>(this.url, {
        params: {
          pictureIdentity: pictureIdentity,
          page: page + ''
        }
      })
      .subscribe((json) => {
        this.count = json.count;
        this.pages = json.pages;

        if (!this.pageStatus[this.pages]) {
          this.pageStatus[this.pages] = null;
        }
        this.pageStatus[json.page] = 'loaded';

        let $activeItem: JQuery | undefined;

        const offset = this.PER_PAGE * (json.page - 1);
        for (const idx in json.items) {
          if (json.hasOwnProperty(idx)) {
            const item = json.items[idx];
            const position: number = offset + Number(idx);

            const active = false; // this.current == item.id;

            const $item = this.renderItem(item);
            $item.data('position', position);
            $item.attr('data-position', position);

            let $before = null;
            this.$inner.find('.item').each(() => {
              const iPos = $(this).data('position');
              if (position < iPos) {
                $before = $(this);
                return false;
              }
            });

            if ($before) {
              $item.insertBefore($before);
            } else {
              $item.appendTo(this.$inner);
            }

            if (active) {
              $activeItem = $item;
            }
          }
        }

        if ($activeItem !== undefined) {
          $activeItem.addClass('active');
          this.activateItem($activeItem, true);
          this.fixArrows($activeItem);
        }

        this.loadSiblingPages(
          this.$inner.find('.item.active').data('position')
        );

        if (callback) {
          callback();
        }
      });
  }

  private renderItem(item: any) {

    const $item = $('<div class="carousel-item item loading"></div>');

    if (item.crop) {
      $(
        '<span class="carousel-control-full"><i class="fa fa-arrows-alt"></i></span>'
      ).appendTo($item);
    }

    return $item;
  }

  private activateItem($item: JQuery, siblings: boolean) {
    if (!$item.data('activated')) {
      $item.data('activated', true);

      const crop = $item.data('crop');
      const full = $item.data('full');

      const cropMode = !!crop;

      $item.data('cropMode', cropMode);

      if (cropMode) {
        $item.addClass('crop');
        const $imgCrop = $('<img />', {
          src: crop.src,
          alt: '',
          class: 'crop'
        });
        $item.prepend($imgCrop);
      }

      const $img = $('<img />', {
        src: full.src,
        alt: '',
        class: 'full'
      });

      $item.prepend($img);
    }

    if (siblings) {
      const $prev = $item.prev('.item');
      if ($prev.length) {
        this.activateItem($prev, false);
      }
      const $next = $item.next('.item');
      if ($next.length) {
        this.activateItem($next, false);
      }
    }
  }

  private fixArrows($item: JQuery) {
    const $left = this.$e.find('.carousel-control-prev');
    const $right = this.$e.find('.carousel-control-next');

    const pos = $item.data('position');

    $left.toggle(pos > 0);
    $right.toggle(pos < this.count - 1);
  }

  private positionPage(index: number) {
    return Math.floor(index / this.PER_PAGE) + 1;
  }
}
