import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Notify from '../notify';
import {
  APIBrandsGetResponse,
  APIBrandsLines,
  APIBrandsIconsResponse
} from '../services/brands.service';
import { PageEnvService } from '../services/page-env.service';
import { combineLatest, Subscription } from 'rxjs';

// import { BrandPopover } from '../brand-popover';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html'
})
@Injectable()
export class BrandsComponent implements OnInit, OnDestroy {
  public items: APIBrandsLines;
  public icons: APIBrandsIconsResponse;
  private sub: Subscription;

  constructor(private http: HttpClient, private pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/61/name',
          pageId: 61
        }),
      0
    );

    this.sub = combineLatest(
      this.http.get<APIBrandsGetResponse>('/api/brands'),
      this.http.get<APIBrandsIconsResponse>('/api/brands/icons')
    ).subscribe(
      data => {
        this.icons = data[1];
        this.addCSS(this.icons.css);
        this.items = data[0].items;
        for (const line of this.items) {
          for (const info of line) {
            for (const item of info.brands) {
              item.cssClass = item.catname.replace(/\./g, '_');
            }
          }
        }
        // BrandPopover.apply('.popover-handler');
      },
      response => {
        Notify.response(response);
      }
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public scrollTo(info) {
    const element = document.getElementById('char' + info.id);
    element.scrollIntoView({ behavior: 'smooth' });
    return false;
  }

  private addCSS(url: string) {
    const cssId = 'brands-css';
    if (!document.getElementById(cssId)) {
      const head = document.getElementsByTagName('head')[0];
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = url;
      link.media = 'all';
      head.appendChild(link);
    }
  }
}
