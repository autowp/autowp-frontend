import { Component, Injectable, Input, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIImage } from '../services/api.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap, tap, debounceTime, switchMapTo, map } from 'rxjs/operators';

/*interface Dimension {
  width: number;
  height: number;
}

interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}*/

interface Rectangle {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface APIGalleryResponse {
  pages: number;
  count: number;
  page: number;
  items: APIGalleryItem[];
}

interface APIGalleryItemArea {
  area: Rectangle;
  name: string;
}

interface APIGalleryItem {
  id: number;
  identity: string;
  url: string;
  sourceUrl: string;
  crop: Rectangle;
  full: APIImage;
  messages: number;
  newMessages: number;
  name: string;
  filesize: number;
  areas: APIGalleryItemArea[];
}

interface APIGallery {
  page: number;
  pages: number;
  count: number;
  items: APIGalleryItem[];
}

interface ItemCache {
  itemID: number;
  pages: Map<number, ItemPageCache>;
  pagesCount: number;
  count: number;
  pictures: Map<number, APIGalleryItem>;
}

interface ItemPageCache {
  loading: boolean;
}

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

  private cache = new Map<number, ItemCache>();

  private MAX_INDICATORS = 30;
  private count = 0;
  private pages = 0;
  private pageStatus: any[] = [];
  private perPage = 10;
  private url: string;

  /*private escHandler: (
    eventObject: JQueryEventObject,
    ...eventData: any[]
  ) => any;*/
  private $e: JQuery;
  //private $carousel: JQuery;
  private $inner: JQuery;
  private $indicators: JQuery;
  private $numbers: JQuery;
  // private carousel: Carousel;
  private position: number;
  private indicatorRendered = false;
  public images: APIGalleryItem[] = [];
  private sub: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    /*this.escHandler = (event) => {
      if (event.keyCode === 27) {
        // esc
        // this.hide();
      }
    };*/

    // this.$carousel = this.$e.find('.carousel');

    // this.$inner = this.$carousel.find('.carousel-inner');

    // this.$e.appendTo(document.body);

    // this.$indicators = this.$e.find('.carousel-indicators');
    // this.$numbers = this.$e.find('.carousel-numbers');

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

    /* this.$carousel
      .find('.carousel-control-close')
      .on('click', (event: JQueryEventObject) => {
        event.preventDefault();

        this.hide();
      });

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

    this.$carousel.on('click', '.carousel-indicators li', (event) => {
      event.preventDefault();

      const position = $(event.currentTarget).data('target');

      const page = this.positionPage(position);

      this.load(null, page, () => {
        this.rewindToPosition(position);
      });
    });

    $(window).on('resize', () => {
      this.fixSize(this.$e.find('.item'));
    });
    this.fixSize(this.$e.find('.item'));

    */
    // this.load(this.current);

    this.sub = this.itemID$
      .pipe(
        debounceTime(50),
        map(itemID => {
          if (!this.cache.has(itemID)) {
            const cacheItem = {
              itemID: itemID,
              pages: new Map<number, ItemPageCache>(),
              pagesCount: null,
              count: null,
              pictures: new Map<number, APIGalleryItem>(),
            };
            this.cache.set(itemID, cacheItem);
          }
          return this.cache.get(itemID);
        }),
        switchMapTo(this.current$, (item, current) => ({item, current})),
        switchMap(data => {
          return this.http.get<APIGallery>(
            '/api/item/' + data.item.itemID + '/gallery', {
              params: {
                picture_identity: data.current
              }
            }
          );
        }, (data, response) => ({item: data.item, response: response})),
        tap(data => {
          data.item.pagesCount = data.response.pages;
          data.item.count = data.response.count;
          data.item.pages.set(data.response.page, {
            loading: true
          });
          data.response.items.forEach((item, idx) => {
            data.item.pictures.set(idx, item);
          });
          const images = [];
          for (let i = 0; i < data.item.count; i++) {
            const img = data.item.pictures.get(i);
            images.push(img);
          }
          this.images = images;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.itemID) {
      this.itemID$.next(changes.itemID.currentValue);
    }

    if (changes.current) {
      console.log('changes.current', changes.current);
      this.current$.next(changes.current.currentValue);
    }
  }

  public prevClick() {
    // this.carousel.prev();
  }

  public nextClick() {
    // this.carousel.next();
  }

  private renderIndicator() {
    if (this.count < this.MAX_INDICATORS) {
      if (!this.indicatorRendered) {
        for (let i = 0; i < this.count; i++) {
          $('<li></li>', {
            'data-target': i,
            appendTo: this.$indicators
          });
        }

        this.indicatorRendered = true;
      }
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

        const offset = this.perPage * (json.page - 1);
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
              this.position = position;
            }
          }
        }

        this.renderIndicator();
        this.refreshIndicator();

        if ($activeItem !== undefined) {
          $activeItem.addClass('active');
          this.activateItem($activeItem, true);
          this.fixArrows($activeItem);

          this.$indicators
            .find('li')
            .eq($activeItem.data('position'))
            .addClass('active');
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
    const $loading = $(
      '<div class="loading-icon"><i class="fa fa-spinner fa-pulse"></i></div>'
    );

    const $source = $(
      '<a class="download carousel-control" role="button">' +
        '<i class="fa fa-download"></i>' +
        '<div class="badge badge-pill badge-info"></div>' +
        '</a>'
    ).attr('href', item.sourceUrl);

    // $source.find('.badge').text(filesize(item.filesize));

    const $details = $(
      '<a class="details carousel-control" role="button">' +
        '<i class="fa fa-picture-o"></i>' +
        '</a>'
    ).attr('href', item.url);

    const $comments = $(
      '<a class="comments carousel-control" role="button">' +
        '<i class="fa fa-comment"></i>' +
        '</a>'
    ).attr('href', item.url + '#comments');

    if (item.messages) {
      const $badge = $('<div class="badge badge-pill badge-info"></div>');
      if (item.newMessages > 0) {
        $badge.text(item.messages - item.newMessages);
        $badge.append(
          $('<span />', {
            text: '+' + item.newMessages
          })
        );
      } else {
        $badge.text(item.messages);
      }
      $comments.append($badge);
    }

    const $caption: JQuery = $(
      '<div class="carousel-caption">' +
        '<h3></h3>' +
        // '<p></p>' +
        '</div>'
    );

    $caption.find('h3').html(item.name);
    // $caption.find('[data-toggle="tooltip"]').tooltip();

    const areas: JQuery[] = [];
    $.map(item.areas, (area) => {
      const $area: JQuery = $('<div class="area"></div>');
      $area.data('area', area.area);
      /*$area.tooltip({
        title: area.name,
        html: true,
        placement: (tooptip: any, node: any) => {
          const winHeight = $(window).height();
          const nodeOffset = $(node).offset();
          const nodeHeight = $(node).height();
          const winCenter = winHeight === undefined ? 0 : winHeight / 2;
          const nodeCenter =
            nodeOffset === undefined || nodeHeight === undefined
              ? 0
              : nodeOffset.top + nodeHeight / 2;

          return winCenter > nodeCenter ? 'bottom' : 'top';
        }
      });*/
      areas.push($area);
    });

    const $item = $('<div class="carousel-item item loading"></div>')
      .data({
        id: item.id,
        full: item.full,
        crop: item.crop
      })
      .append(areas)
      .append($caption)
      .append($source)
      .append($comments)
      .append($details)
      .append($loading);

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

      $img.bind('load', () => {
        $img.closest('.item').removeClass('loading');
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

    this.fixSize($item);
  }

  private fixArrows($item: JQuery) {
    const $left = this.$e.find('.carousel-control-prev');
    const $right = this.$e.find('.carousel-control-next');

    const pos = $item.data('position');

    $left.toggle(pos > 0);
    $right.toggle(pos < this.count - 1);
  }

  /*private bound(container: Dimension, content: Dimension): Dimension {
    const containerRatio = container.width / container.height;
    const contentRatio = content.width / content.height;

    let width, height;
    if (contentRatio > containerRatio) {
      width = container.width;
      height = width / contentRatio;
    } else {
      height = container.height;
      width = height * contentRatio;
    }

    return {
      width: width,
      height: height
    };
  }*/

  /*private boundCenter(container: Dimension, content: Dimension): Bounds {
    return {
      left: (container.width - content.width) / 2,
      top: (container.height - content.height) / 2,
      width: content.width,
      height: content.height
    };
  }

  private maxBounds(bounds: Dimension, maxBounds: Dimension): Dimension {
    if (bounds.height > maxBounds.height || bounds.width > maxBounds.width) {
      return maxBounds;
    }
    return bounds;
  }

  private areasToBounds($item: JQuery, offsetBounds: Bounds) {
    $item.find('.area').each(() => {
      const area = $(this).data('area');
      $(this).css({
        left: offsetBounds.left + area.left * offsetBounds.width,
        top: offsetBounds.top + area.top * offsetBounds.height,
        width: area.width * offsetBounds.width,
        height: area.height * offsetBounds.height
      });
    });
  }*/

  private fixSize($items: JQuery) {
    //const w = this.$inner.width() || 0;
    //const h = this.$inner.height() || 0;

    /*const cSize: Dimension = {
      width: w,
      height: h
    };*/

    $items.each(() => {
      /*const $item: JQuery = $(this);
      const $imgFull: JQuery = $item.find('img.full');
      const $imgCrop: JQuery = $item.find('img.crop');
      const full = $item.data('full');
      const crop: any = $item.data('crop');
      const cropMode: any = $item.data('cropMode');

      let bounds: Dimension;
      let offsetBounds: Bounds;

      if (crop) {
        if (cropMode) {
          bounds = this.maxBounds(
            this.bound(cSize, {
              width: crop.width,
              height: crop.height
            }),
            {
              width: crop.width,
              height: crop.height
            }
          );

          offsetBounds = this.boundCenter(cSize, bounds);
          $imgCrop.css({
            width: offsetBounds.width,
            height: offsetBounds.height,
            left: offsetBounds.left,
            top: offsetBounds.top
          });
          const fullWidth = bounds.width / crop.crop.width;
          const fullHeight = bounds.height / crop.crop.height;
          const imgFullBounds = {
            left: offsetBounds.left - crop.crop.left * fullWidth,
            top: offsetBounds.top - crop.crop.top * fullHeight,
            width: fullWidth,
            height: fullHeight
          };
          $imgFull.css({
            width: imgFullBounds.width,
            height: imgFullBounds.height,
            left: imgFullBounds.left,
            top: imgFullBounds.top
          });

          this.areasToBounds($item, imgFullBounds);
        } else {
          bounds = this.maxBounds(
            this.bound(cSize, {
              width: full.width,
              height: full.height
            }),
            {
              width: full.width,
              height: full.height
            }
          );
          offsetBounds = this.boundCenter(cSize, bounds);
          $imgFull.css({
            width: offsetBounds.width,
            height: offsetBounds.height,
            left: offsetBounds.left,
            top: offsetBounds.top
          });
          $imgCrop.css({
            left: offsetBounds.left + crop.crop.left * bounds.width,
            top: offsetBounds.top + crop.crop.top * bounds.height,
            width: bounds.width * crop.crop.width,
            height: bounds.height * crop.crop.height
          });

          this.areasToBounds($item, offsetBounds);
        }
      } else {
        if (!full) {
          throw new Error('Full is undefined');
        }
        bounds = this.maxBounds(
          this.bound(cSize, {
            width: full.width,
            height: full.height
          }),
          {
            width: full.width,
            height: full.height
          }
        );
        offsetBounds = this.boundCenter(cSize, bounds);
        $imgFull.css({
          width: offsetBounds.width,
          height: offsetBounds.height,
          left: offsetBounds.left,
          top: offsetBounds.top
        });

        this.areasToBounds($item, offsetBounds);
      }*/
    });
  }

  /*private hide() {
    this.$e.hide();
    $(document.body).removeClass('gallery-shown');

    // this.carousel.hide();

    $(document).off('keyup' as any, this.escHandler as any);
  }

  private show() {
    $(document.body).addClass('gallery-shown');
    this.$e.show();
    this.fixSize(this.$e.find('.item'));

    $(document).on('keyup', this.escHandler);

    this.$e.find('a.carousel-control-next').focus();

    // this.carousel.show();
  }*/

  /*private rewindToPosition(position: number) {
    this.position = position;
    this.refreshIndicator();
    this.$e.find('.item').each((idx) => {
      if ($(this).data('position') === position) {
        // this.carousel.to(idx);
        return false;
      }
    });
  }

  private rewindToId(id: number) {
    this.$carousel.find('.item').each((idx: number) => {
      if ($(this).data().id === id) {
        // this.$carousel.carousel(Number(idx));

        this.position = $(this).data('position');
        this.refreshIndicator();
        // this.fixArrows($(this));

        return false;
      }
    });
  }*/

  private positionPage(index: number) {
    return Math.floor(index / this.perPage) + 1;
  }

  private refreshIndicator() {
    if (this.count >= this.MAX_INDICATORS) {
      this.$numbers.text(this.position + 1 + ' of ' + this.count);
    }
  }
}
