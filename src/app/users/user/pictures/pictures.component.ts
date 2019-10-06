import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ItemService, APIItem } from '../../../services/item';
import { ActivatedRoute } from '@angular/router';
import { UserService, APIUser } from '../../../services/user';
import { Subscription, combineLatest } from 'rxjs';
import { PageEnvService } from '../../../services/page-env.service';
import { switchMap, tap } from 'rxjs/operators';
import { APIBrandsIconsResponse } from '../../../services/brands.service';
import { HttpClient } from '@angular/common/http';
import {ToastsService} from '../../../toasts/toasts.service';

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
  selector: 'app-users-user-pictures',
  templateUrl: './pictures.component.html'
})
@Injectable()
export class UsersUserPicturesComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public brands: APIItem[];
  public identity: string;
  public icons: APIBrandsIconsResponse;
  public user: APIUser;

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private http: HttpClient,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params
      .pipe(
        switchMap(params =>
          this.userService.getByIdentity(params.identity, {
            fields: 'identity'
          })
        ),
        tap(user => {
          this.user = user;
          this.identity = user.identity ? user.identity : 'user' + user.id;
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            name: 'page/63/name',
            pageId: 63
          });
        }),
        switchMap(user =>
          combineLatest([
            this.itemService.getItems({
              type_id: 5,
              limit: 3000,
              order: 'name_nat',
              fields: 'name_only,catname,current_pictures_count',
              descendant_pictures: {
                status: 'accepted',
                owner_id: user.id
              }
            }),
            this.http.get<APIBrandsIconsResponse>('/api/brands/icons')
          ])
        )
      )
      .subscribe(
        response => {
          this.brands = response[0].items;
          this.icons = response[1];
          addCSS(this.icons.css);
        },
        response => this.toastService.response(response)
      );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public cssClass(item: APIItem) {
    return item.catname.replace(/\./g, '_');
  }
}
