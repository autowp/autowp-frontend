import {AsyncPipe, DOCUMENT, isPlatformBrowser, NgClass} from '@angular/common';
import {Component, inject, PLATFORM_ID, Renderer2} from '@angular/core';
import {NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {environment} from '@environment/environment';
import {APIUser, ItemFields, ItemListOptions, ItemType, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {
  NgbCollapse,
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbModal,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import {ACLService} from '@services/acl.service';
import {AuthService} from '@services/auth.service';
import {Language, LanguageService} from '@services/language';
import {MessageService} from '@services/message';
import {LayoutParams, PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {Angulartics2GoogleAnalytics} from 'angulartics2';
import {KeycloakService} from 'keycloak-angular';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

import {MenuComponent} from './moder/menu/menu/menu.component';
import {ContainerComponent} from './toasts/container/container.component';
import {UsersOnlineComponent} from './users/online/online.component';

@Component({
  imports: [
    MenuComponent,
    RouterLink,
    NgbCollapse,
    RouterLinkActive,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgClass,
    RouterOutlet,
    NgbTooltip,
    MarkdownComponent,
    ContainerComponent,
    AsyncPipe,
  ],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected readonly auth = inject(AuthService);
  protected readonly acl = inject(ACLService);
  protected readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly languageService = inject(LanguageService);
  private readonly modalService = inject(NgbModal);
  private readonly renderer = inject(Renderer2);
  private readonly keycloak = inject(KeycloakService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly platform = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  protected languages: Language[] = environment.languages;
  protected readonly layoutParams$: Observable<LayoutParams> = this.pageEnv.layoutParams$.asObservable();
  protected readonly user$: Observable<APIUser | null> = this.auth.getUser$();
  protected readonly newPersonalMessages$ = this.messageService
    .getNew$()
    .pipe(shareReplay({bufferSize: 1, refCount: false}));
  protected searchHostname: string;
  protected readonly categories$ = this.itemsClient.list(
    new ListItemsRequest({
      fields: new ItemFields({
        descendantsCount: true,
        nameText: true,
      }),
      language: this.languageService.language,
      limit: 20,
      options: new ItemListOptions({
        noParent: true,
        typeId: ItemType.ITEM_TYPE_CATEGORY,
      }),
    }),
  );
  protected language: string = this.languageService.language;
  protected urlPath = '/';
  protected isNavbarCollapsed = true;

  constructor() {
    const angulartics2GoogleAnalytics = inject(Angulartics2GoogleAnalytics);

    this.layoutParams$.subscribe((params) => {
      if (params.isGalleryPage) {
        this.renderer.addClass(this.document.body, 'gallery');
      } else {
        this.renderer.removeClass(this.document.body, 'gallery');
      }
    });

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
    if (isPlatformBrowser(this.platform)) {
      this.keycloak.login({
        locale: this.languageService.language,
        redirectUri: window.location.href,
      });
    }
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
