import {
  Component,
  Input,
  HostListener,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { APIGalleryItem } from './definitions';
import * as $ from 'jquery';

interface Dimension {
  width: number;
  height: number;
}

interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

function boundCenter(container: Dimension, content: Dimension): Bounds {
  return {
    left: (container.width - content.width) / 2,
    top: (container.height - content.height) / 2,
    width: content.width,
    height: content.height
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
    width,
    height
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
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements AfterViewInit, OnChanges {
  @Input() item: APIGalleryItem;
  @Input() prefix: string[] = [];

  public fullStyle;

  public cropStyle;

  public cropMode = true;

  public fullLoading = true;
  public cropLoading = true;

  constructor(private el: ElementRef) {}

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
  onResize() {
    this.fixSize();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.fixSize(), 0);
  }

  public fullLoaded() {
    this.fullLoading = false;
  }

  public cropLoaded() {
    this.cropLoading = false;
  }

  public toggleCrop() {
    this.cropMode = !this.cropMode;
    this.fixSize();
  }

  private fixSize() {
    if (! this.el) {
      console.log('this.el is undefined', this.el);
    }
    const $inner = $(this.el.nativeElement);
    const w = $inner.width() || 0;
    const h = $inner.height() || 0;

    const cSize: Dimension = {
      width: w,
      height: h
    };

    const full = this.item.full;
    const crop = this.item.crop;

    if (crop) {
      if (this.cropMode) {
        const bounds = maxBounds(
          bound(cSize, {
            width: crop.width,
            height: crop.height
          }),
          {
            width: crop.width,
            height: crop.height
          }
        );

        const offsetBounds = boundCenter(cSize, bounds);
        this.cropStyle = {
          'width.px': offsetBounds.width,
          'height.px': offsetBounds.height,
          'left.px': offsetBounds.left,
          'top.px': offsetBounds.top
        };
        const fullWidth = bounds.width / crop.crop.width;
        const fullHeight = bounds.height / crop.crop.height;
        const imgFullBounds = {
          left: offsetBounds.left - crop.crop.left * fullWidth,
          top: offsetBounds.top - crop.crop.top * fullHeight,
          width: fullWidth,
          height: fullHeight
        };
        this.fullStyle = {
          'width.px': imgFullBounds.width,
          'height.px': imgFullBounds.height,
          'left.px': imgFullBounds.left,
          'top.px': imgFullBounds.top
        };

        this.areasToBounds(imgFullBounds);
      } else {
        const bounds = maxBounds(
          bound(cSize, {
            width: full.width,
            height: full.height
          }),
          {
            width: full.width,
            height: full.height
          }
        );
        const offsetBounds = boundCenter(cSize, bounds);
        this.fullStyle = {
          'width.px': offsetBounds.width,
          'height.px': offsetBounds.height,
          'left.px': offsetBounds.left,
          'top.px': offsetBounds.top
        };
        this.cropStyle = {
          'left.px': offsetBounds.left + crop.crop.left * bounds.width,
          'top.px': offsetBounds.top + crop.crop.top * bounds.height,
          'width.px': bounds.width * crop.crop.width,
          'height.px': bounds.height * crop.crop.height
        };

        this.areasToBounds(offsetBounds);
      }
    } else {
      if (full) {
        const bounds = maxBounds(
          bound(cSize, {
            width: full.width,
            height: full.height
          }),
          {
            width: full.width,
            height: full.height
          }
        );
        const offsetBounds = boundCenter(cSize, bounds);
        this.fullStyle = {
          'width.px': offsetBounds.width,
          'height.px': offsetBounds.height,
          'left.px': offsetBounds.left,
          'top.px': offsetBounds.top
        };

        this.areasToBounds(offsetBounds);
      }
    }
  }

  private areasToBounds(offsetBounds: Bounds) {
    this.item.areas.forEach((area) => {
      area.styles = {
        'left.px': offsetBounds.left + area.area.left * offsetBounds.width,
        'top.px': offsetBounds.top + area.area.top * offsetBounds.height,
        'width.px': area.area.width * offsetBounds.width,
        'height.px': area.area.height * offsetBounds.height
      };
    });
  }
}
