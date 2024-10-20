import {AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import $ from 'jquery';

import {APIGalleryItem} from './definitions';

interface Dimension {
  height: number;
  width: number;
}

interface Bounds {
  height: number;
  left: number;
  top: number;
  width: number;
}

function boundCenter(container: Dimension, content: Dimension): Bounds {
  return {
    height: content.height,
    left: (container.width - content.width) / 2,
    top: (container.height - content.height) / 2,
    width: content.width,
  };
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

function maxBounds(bounds: Dimension, max: Dimension): Dimension {
  if (bounds.height > max.height || bounds.width > max.width) {
    return max;
  }
  return bounds;
}

@Component({
  selector: 'app-gallery-carousel-item',
  styleUrls: ['./carousel-item.component.scss'],
  templateUrl: './carousel-item.component.html',
})
export class CarouselItemComponent implements AfterViewInit, OnChanges {
  @Input() item?: APIGalleryItem;
  @Input() prefix: string[] = [];

  protected fullStyle: {[key: string]: number} = {};

  protected cropStyle: {[key: string]: number} = {};

  protected cropMode = true;

  protected fullLoading = true;
  protected cropLoading = true;

  constructor(private readonly el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.cropLoading = true;
      this.fullLoading = true;
      this.cropMode = !!changes.item.currentValue.crop;
      this.fixSize();

      if (!changes.item.currentValue.crop) {
        this.cropLoading = false;
      }

      if (!changes.item.currentValue.full) {
        this.fullLoading = false;
      }
    }
  }

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
    if (!this.el) {
      console.debug('this.el is undefined', this.el);
    }

    if (!this.item) {
      return;
    }

    const $inner = $(this.el.nativeElement);
    const w = $inner.width() || 0;
    const h = $inner.height() || 0;

    const cSize: Dimension = {
      height: h,
      width: w,
    };

    const full = this.item.full;
    const crop = this.item.crop;

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
        const fullWidth = bounds.width / crop.crop.width;
        const fullHeight = bounds.height / crop.crop.height;
        const imgFullBounds = {
          height: fullHeight,
          left: offsetBounds.left - crop.crop.left * fullWidth,
          top: offsetBounds.top - crop.crop.top * fullHeight,
          width: fullWidth,
        };
        this.fullStyle = {
          'height.px': imgFullBounds.height,
          'left.px': imgFullBounds.left,
          'top.px': imgFullBounds.top,
          'width.px': imgFullBounds.width,
        };

        this.areasToBounds(imgFullBounds);
      } else {
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
          'height.px': bounds.height * crop.crop.height,
          'left.px': offsetBounds.left + crop.crop.left * bounds.width,
          'top.px': offsetBounds.top + crop.crop.top * bounds.height,
          'width.px': bounds.width * crop.crop.width,
        };

        this.areasToBounds(offsetBounds);
      }
    } else {
      if (full) {
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

        this.areasToBounds(offsetBounds);
      }
    }
  }

  private areasToBounds(offsetBounds: Bounds) {
    if (this.item) {
      this.item.areas.forEach((area) => {
        area.styles = {
          'height.px': area.area.height * offsetBounds.height,
          'left.px': offsetBounds.left + area.area.left * offsetBounds.width,
          'top.px': offsetBounds.top + area.area.top * offsetBounds.height,
          'width.px': area.area.width * offsetBounds.width,
        };
      });
    }
  }
}
