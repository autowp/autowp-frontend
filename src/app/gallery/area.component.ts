import {Component, Input} from '@angular/core';

import {APIGalleryItemArea} from './definitions';

@Component({
  selector: 'app-gallery-carousel-item-area',
  styleUrls: ['./area.component.scss'],
  templateUrl: './area.component.html',
})
export class AreaComponent {
  @Input() styles: {[key: string]: number} = {};
  @Input() area?: APIGalleryItemArea;

  protected placement(): string {
    const winHeight = window.innerHeight;
    const nodeOffset = this.styles['top.px'] ? this.styles['top.px'] : 0;
    const nodeHeight = this.styles['height.px'] ? this.styles['height.px'] : 0;
    const winCenter = winHeight === undefined ? 0 : winHeight / 2;
    const nodeCenter = nodeOffset === undefined || nodeHeight === undefined ? 0 : nodeOffset + nodeHeight / 2;

    return winCenter > nodeCenter ? 'bottom' : 'top';
  }
}
