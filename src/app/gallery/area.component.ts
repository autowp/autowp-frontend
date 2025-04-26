import {NgStyle} from '@angular/common';
import {Component, input} from '@angular/core';
import {PictureItem} from '@grpc/spec.pb';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [NgStyle, NgbTooltip],
  selector: 'app-gallery-carousel-item-area',
  styleUrls: ['./area.component.scss'],
  templateUrl: './area.component.html',
})
export class AreaComponent {
  readonly styles = input.required<Record<string, number> | undefined>({});
  readonly area = input.required<PictureItem>();

  protected placement(): string {
    const winHeight = window.innerHeight;
    const styles = this.styles();
    const nodeOffset = styles?.['top.px'] ? styles['top.px'] : 0;
    const stylesValue = this.styles();
    const nodeHeight = stylesValue?.['height.px'] ? stylesValue['height.px'] : 0;
    const winCenter = winHeight == undefined ? 0 : winHeight / 2;
    const nodeCenter = nodeOffset == undefined || nodeHeight == undefined ? 0 : nodeOffset + nodeHeight / 2;

    return winCenter > nodeCenter ? 'bottom' : 'top';
  }
}
