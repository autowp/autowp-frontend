import { Component, OnInit, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  @Input() url: string;
  @Input() text: string;

  ngOnInit() {}

  buildURL(url: string, params: { [s: string]: string }): string {
    let p = new HttpParams();
    for (const key of Object.keys(params)) {
      p = p.set(key, params[key]);
    }

    console.log(p, p.toString());

    return url + p.toString();
  }

  public share(href: string) {
    // ga('send', 'event', 'share', $this.attr('title'));

    window.open(
      href,
      null,
      'height=600,width=600,resizable=yes,scrollbars=no,status=no,toolbar=no,location=no,directories=no'
    );

    return false;
  }
}
