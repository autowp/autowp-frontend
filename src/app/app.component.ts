import {Component, Renderer2} from '@angular/core';
import {AuthService} from '@services/auth.service';
import {ACLService} from '@services/acl.service';
import {PageEnvService, LayoutParams} from '@services/page-env.service';
import {Observable} from 'rxjs';
import {Language, LanguageService} from '@services/language';
import {ItemService} from '@services/item';
import {UsersOnlineComponent} from './users/online/online.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {APIUser, ItemType} from '@grpc/spec.pb';
import {map, shareReplay} from 'rxjs/operators';
import {NavigationStart, Router} from '@angular/router';
import {MessageService} from '@services/message';
import {Angulartics2GoogleAnalytics} from 'angulartics2';
import {environment} from '@environment/environment';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected languages: Language[] = [];
  protected readonly layoutParams$: Observable<LayoutParams>;
  protected readonly user$: Observable<APIUser> = this.auth.getUser$();
  protected readonly newPersonalMessages$ = this.messageService.getNew$().pipe(
    map((result) => ({
      count: result,
    })),
    shareReplay(1)
  );
  protected searchHostname: string;
  protected readonly categories$ = this.itemService.getItems$({
    type_id: ItemType.ITEM_TYPE_CATEGORY,
    no_parent: true,
    fields: 'name_text,catname,descendants_count',
    limit: 20,
  });
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
    private readonly itemService: ItemService,
    private readonly modalService: NgbModal,
    private readonly renderer: Renderer2,
    private readonly keycloak: KeycloakService,
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
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
      redirectUri: window.location.href,
      locale: this.languageService.language,
    });
  }

  protected signOut() {
    this.auth.signOut$().subscribe({
      error: (error: unknown) => {
        console.log(error);
      },
    });

    return false;
  }

  protected showOnlineUsers() {
    this.modalService.open(UsersOnlineComponent, {
      size: 'lg',
      centered: true,
    });

    return false;
  }
}
