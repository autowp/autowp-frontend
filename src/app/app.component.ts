import {Component, Renderer2} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {environment} from '@environment/environment';
import {APIUser, ItemFields, ItemType, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ACLService} from '@services/acl.service';
import {AuthService} from '@services/auth.service';
import {Language, LanguageService} from '@services/language';
import {MessageService} from '@services/message';
import {LayoutParams, PageEnvService} from '@services/page-env.service';
import {Angulartics2GoogleAnalytics} from 'angulartics2';
import {KeycloakService} from 'keycloak-angular';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

import {UsersOnlineComponent} from './users/online/online.component';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected languages: Language[] = [];
  protected readonly layoutParams$: Observable<LayoutParams>;
  protected readonly user$: Observable<APIUser> = this.auth.getUser$();
  protected readonly newPersonalMessages$ = this.messageService.getNew$().pipe(shareReplay(1));
  protected searchHostname: string;
  protected readonly categories$ = this.itemsClient.list(
    new ListItemsRequest({
      fields: new ItemFields({
        descendantsCount: true,
        nameText: true,
      }),
      language: this.languageService.language,
      limit: 20,
      noParent: true,
      typeId: ItemType.ITEM_TYPE_CATEGORY,
    }),
  );
  protected language: string;
  protected urlPath = '/';
  protected isNavbarCollapsed = true;

  constructor(
    protected readonly auth: AuthService,
    protected readonly acl: ACLService,
    protected readonly router: Router,
    private readonly messageService: MessageService,
    private readonly pageEnv: PageEnvService,
    private readonly languageService: LanguageService,
    private readonly modalService: NgbModal,
    private readonly renderer: Renderer2,
    private readonly keycloak: KeycloakService,
    private readonly itemsClient: ItemsClient,
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
  ) {
    this.language = this.languageService.language;

    this.layoutParams$ = this.pageEnv.layoutParams$.asObservable();
    this.layoutParams$.subscribe((params) => {
      if (params.isGalleryPage) {
        this.renderer.addClass(document.body, 'gallery');
      } else {
        this.renderer.removeClass(document.body, 'gallery');
      }
    });

    this.languages = environment.languages;
    let searchHostname = 'wheelsage.org';
    for (const itemLanguage of this.languages) {
      if (itemLanguage.code === this.language) {
        searchHostname = itemLanguage.hostname;
      }
    }

    this.searchHostname = searchHostname;

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.urlPath = val.url;
      }
    });

    if (environment.production) {
      angulartics2GoogleAnalytics.startTracking();
    }
  }

  protected doLogin() {
    this.keycloak.login({
      locale: this.languageService.language,
      redirectUri: window.location.href,
    });
  }

  protected signOut() {
    this.auth.signOut$().subscribe({
      error: (error: unknown) => {
        console.error(error);
      },
    });

    return false;
  }

  protected showOnlineUsers() {
    this.modalService.open(UsersOnlineComponent, {
      centered: true,
      size: 'lg',
    });

    return false;
  }
}
