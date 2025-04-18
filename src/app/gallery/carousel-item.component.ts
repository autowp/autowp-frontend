import {NgStyle} from '@angular/common';
import {AfterViewInit, Component, ElementRef, HostListener, inject, Input} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {RouterLink} from '@angular/router';
import {Picture, PictureItem} from '@grpc/spec.pb';
import {NgMathPipesModule} from 'ngx-pipes';

import {AreaComponent} from './area.component';

interface Area {
  pictureItem: PictureItem;
  styles: {[key: string]: number};
}

interface Bounds {
  height: number;
  left: number;
  top: number;
  width: number;
}

interface Dimension {
  height: number;
  width: number;
}

function bound(container: Dimension, content: Dimension): Dimension {
  const containerRatio = container.width / container.height;
  const contentRatio = content.width / content.height;

  let width: number;
  let height: number;
  if (contentRatio > containerRatio) {
    width = container.width;
    height = width / contentRatio;
  } else {
    height = container.height;
    width = height * contentRatio;
  }

  return {
    height,
    width,
  };
}

function boundCenter(container: Dimension, content: Dimension): Bounds {
  return {
    height: content.height,
    left: (container.width - content.width) / 2,
    top: (container.height - content.height) / 2,
    width: content.width,
  };
}

function maxBounds(bounds: Dimension, max: Dimension): Dimension {
  if (bounds.height > max.height || bounds.width > max.width) {
    return max;
  }
  return bounds;
}

@Component({
  imports: [NgStyle, AreaComponent, RouterLink, NgMathPipesModule],
  selector: 'app-gallery-carousel-item',
  styleUrls: ['./carousel-item.component.scss'],
  templateUrl: './carousel-item.component.html',
})
export class CarouselItemComponent implements AfterViewInit {
  readonly #el: ElementRef<HTMLElement> = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);

  protected _item?: Picture;
  protected areas: Area[] = [];
  protected nameHtml: SafeHtml = '';

  @Input() set item(item: Picture) {
    this._item = item;
    // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
    this.nameHtml = this.sanitizer.bypassSecurityTrustHtml(item.nameHtml);
    this.areas = (item.pictureItems?.items || []).map((pictureItem) => ({
      pictureItem,
      styles: {},
    }));

    this.cropLoading = true;
    this.fullLoading = true;
    this.cropMode = !!item.imageGallery;
    this.fixSize();

    if (!item.imageGallery) {
      this.cropLoading = false;
    }

    if (!item.imageGalleryFull) {
      this.fullLoading = false;
    }
  }

  @Input() prefix: string[] = [];

  protected fullStyle: {[key: string]: number} = {};

  protected cropStyle: {[key: string]: number} = {};

  protected cropMode = true;

  protected fullLoading = true;
  protected cropLoading = true;

  @HostListener('window:resize', ['$event'])
  protected onResize() {
    this.fixSize();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.fixSize(), 0);
  }

  protected fullLoaded() {
    this.fullLoading = false;
  }

  protected cropLoaded() {
    this.cropLoading = false;
  }

  protected toggleCrop() {
    this.cropMode = !this.cropMode;
    this.fixSize();
  }

  private fixSize() {
    if (!this.#el) {
      console.debug('this.el is undefined', this.#el);
    }

    if (!this._item || !this._item.image) {
      return;
    }

    const w = this.#el.nativeElement.clientWidth || 0;
    const h = this.#el.nativeElement.clientHeight || 0;

    const cSize: Dimension = {
      height: h,
      width: w,
    };

    const full = this._item.imageGalleryFull;
    const crop = this._item.imageGallery;

    const ih = this._item.image.height;
    const iw = this._item.image.width;

    if (crop) {
      if (this.cropMode) {
        const bounds = maxBounds(
          bound(cSize, {
            height: crop.height,
            width: crop.width,
          }),
          {
            height: crop.height,
            width: crop.width,
          },
        );

        const offsetBounds = boundCenter(cSize, bounds);
        this.cropStyle = {
          'height.px': offsetBounds.height,
          'left.px': offsetBounds.left,
          'top.px': offsetBounds.top,
          'width.px': offsetBounds.width,
        };
        const fullWidth = (bounds.width / this._item.image.cropWidth) * iw;
        const fullHeight = (bounds.height / this._item.image.cropHeight) * ih;
        const imgFullBounds = {
          height: fullHeight,
          left: offsetBounds.left - (this._item.image.cropLeft * fullWidth) / iw,
          top: offsetBounds.top - (this._item.image.cropTop * fullHeight) / ih,
          width: fullWidth,
        };
        this.fullStyle = {
          'height.px': imgFullBounds.height,
          'left.px': imgFullBounds.left,
          'top.px': imgFullBounds.top,
          'width.px': imgFullBounds.width,
        };

        this.areasToBounds(imgFullBounds, iw, ih);
      } else if (full) {
        const bounds = maxBounds(
          bound(cSize, {
            height: full.height,
            width: full.width,
          }),
          {
            height: full.height,
            width: full.width,
          },
        );
        const offsetBounds = boundCenter(cSize, bounds);
        this.fullStyle = {
          'height.px': offsetBounds.height,
          'left.px': offsetBounds.left,
          'top.px': offsetBounds.top,
          'width.px': offsetBounds.width,
        };
        this.cropStyle = {
          'height.px': (bounds.height * this._item.image.cropHeight) / ih,
          'left.px': offsetBounds.left + (this._item.image.cropLeft * bounds.width) / iw,
          'top.px': offsetBounds.top + (this._item.image.cropTop * bounds.height) / ih,
          'width.px': (bounds.width * this._item.image.cropWidth) / iw,
        };

        this.areasToBounds(offsetBounds, iw, ih);
      }
    } else if (full) {
      const bounds = maxBounds(
        bound(cSize, {
          height: full.height,
          width: full.width,
        }),
        {
          height: full.height,
          width: full.width,
        },
      );
      const offsetBounds = boundCenter(cSize, bounds);
      this.fullStyle = {
        'height.px': offsetBounds.height,
        'left.px': offsetBounds.left,
        'top.px': offsetBounds.top,
        'width.px': offsetBounds.width,
      };

      this.areasToBounds(offsetBounds, iw, ih);
    }
  }

  private areasToBounds(offsetBounds: Bounds, iw: number, ih: number) {
    if (this._item) {
      this.areas.forEach((area) => {
        area.styles = {
          'height.px': (area.pictureItem.cropHeight * offsetBounds.height) / ih,
          'left.px': offsetBounds.left + (area.pictureItem.cropLeft * offsetBounds.width) / iw,
          'top.px': offsetBounds.top + (area.pictureItem.cropTop * offsetBounds.height) / ih,
          'width.px': (area.pictureItem.cropWidth * offsetBounds.width) / iw,
        };
      });
    }
  }
}
