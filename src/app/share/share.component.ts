import {HttpParams} from '@angular/common/http';
import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-share',
  standalone: true,
  styleUrls: ['./share.component.scss'],
  templateUrl: './share.component.html',
})
export class ShareComponent {
  readonly url = input.required<string>();
  readonly text = input.required<string>();

  buildURL(url: string, params: Record<string, string>): string {
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
