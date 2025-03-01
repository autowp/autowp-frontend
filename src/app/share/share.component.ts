import {HttpParams} from '@angular/common/http';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-share',
  standalone: true,
  styleUrls: ['./share.component.scss'],
  templateUrl: './share.component.html',
})
export class ShareComponent {
  @Input() url: string = '';
  @Input() text: string = '';

  buildURL(url: string, params: {[s: string]: string}): string {
    let p = new HttpParams();
    for (const key of Object.keys(params)) {
      p = p.set(key, params[key]);
    }

    return url + p.toString();
  }

  protected share(href: string) {
    window.open(
      href,
      undefined,
      'height=600,width=600,resizable=yes,scrollbars=no,status=no,toolbar=no,location=no,directories=no',
    );

    return false;
  }
}
