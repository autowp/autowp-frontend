import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  APIBrandsGetResponse,
  APIBrandsLines
} from '../services/brands.service';
import { PageEnvService } from '../services/page-env.service';
import { combineLatest, Subscription } from 'rxjs';
import {ToastsService} from '../toasts/toasts.service';
import { APIService } from '../services/api.service';
import {AutowpClient} from '../../../generated/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {BrandIcons} from '../../../generated/spec.pb';

function addCSS(url: string) {
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

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html'
})
export class BrandsComponent implements OnInit, OnDestroy {
  public items: APIBrandsLines;
  public icons: BrandIcons;
  private sub: Subscription;

  constructor(private api: APIService, private pageEnv: PageEnvService, private toastService: ToastsService, private grpc: AutowpClient) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `All brands`,
          pageId: 61
        }),
      0
    );

    this.sub = combineLatest([
      this.api.request<APIBrandsGetResponse>('GET', 'brands'),
      this.grpc.getBrandIcons(new Empty())
    ]).subscribe(
      ([response, icons]) => {
        this.icons = icons;
        addCSS(this.icons.css);
        this.items = response.items;
        for (const line of this.items) {
          for (const info of line) {
            for (const item of info.brands) {
              item.cssClass = item.catname.replace(/\./g, '_');
            }
          }
        }
        // BrandPopover.apply('.popover-handler');
      },
      response => this.toastService.response(response)
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
}
