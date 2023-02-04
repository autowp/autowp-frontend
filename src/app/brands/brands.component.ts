import {Component, OnInit} from '@angular/core';
import {APIBrandsGetResponse, APIBrandsLines} from '../services/brands.service';
import {PageEnvService} from '../services/page-env.service';
import {EMPTY, Observable} from 'rxjs';
import {ToastsService} from '../toasts/toasts.service';
import {APIService} from '../services/api.service';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {BrandIcons} from '@grpc/spec.pb';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';

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
  templateUrl: './brands.component.html',
})
export class BrandsComponent implements OnInit {
  public items$: Observable<APIBrandsLines> = this.api.request<APIBrandsGetResponse>('GET', 'brands').pipe(
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => {
      const items = response.items;
      for (const line of items) {
        for (const info of line) {
          for (const item of info.brands) {
            item.cssClass = item.catname.replace(/\./g, '_');
          }
        }
      }
      return items;
    })
  );

  public icons$: Observable<BrandIcons> = this.grpc.getBrandIcons(new Empty()).pipe(
    tap((icons) => {
      addCSS(icons.css);
    }),
    shareReplay(1)
  );

  constructor(
    private api: APIService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private grpc: AutowpClient
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 61}), 0);
  }

  public scrollTo(info) {
    const element = document.getElementById('char' + info.id);
    element.scrollIntoView({behavior: 'smooth'});
    return false;
  }
}
