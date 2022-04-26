import {Component, Renderer2} from '@angular/core';
import { AuthService } from './services/auth.service';
import { ACLService } from './services/acl.service';
import { PageEnvService, LayoutParams } from './services/page-env.service';
import { Observable } from 'rxjs';
import {Language, LanguageService} from './services/language';
import {ItemService} from './services/item';
import { UsersOnlineComponent } from './users/online/online.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {APIUser} from '../../generated/spec.pb';
import {map, shareReplay} from 'rxjs/operators';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {MessageService} from './services/message';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {environment} from '../environments/environment';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public languages: Language[] = [];
  public layoutParams$: Observable<LayoutParams>;
  public loginInvalidParams: any;
  public user: APIUser;
  public newPersonalMessages$ = this.messageService.getNew().pipe(
    map(result => ({
      count: result
    })),
    shareReplay(1)
  );
  public searchHostname: string;
  public categories$ = this.itemService.getItems({
    type_id: 3,
    no_parent: true,
    fields: 'name_text,catname,descendants_count',
    limit: 20
  });
  public language: string;
  public urlPath = '/';
  public isNavbarCollapsed = true;

  constructor(
    public auth: AuthService,
    public acl: ACLService,
    private router: Router,
    private messageService: MessageService,
    private pageEnv: PageEnvService,
    private languageService: LanguageService,
    private itemService: ItemService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private keycloak: KeycloakService,
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) {
    this.language = this.languageService.language;

    moment.locale(this.languageService.momentLocale);

    this.layoutParams$ = this.pageEnv.layoutParams$.asObservable();
    this.layoutParams$.subscribe(params => {
      if (params.isGalleryPage) {
        this.renderer.addClass(document.body, 'gallery');
      } else {
        this.renderer.removeClass(document.body, 'gallery');
      }
    });

    this.auth.getUser().subscribe(user => {
      this.user = user;
    });

    this.languages = environment.languages;
    let searchHostname = 'wheelsage.org';
    for (const itemLanguage of this.languages) {
      if (itemLanguage.code === this.language) {
        searchHostname = itemLanguage.hostname;
      }
    }

    this.searchHostname = searchHostname;

    this.router.events.subscribe((val: RouterEvent) => {
      if (val instanceof NavigationStart) {
        this.urlPath = val.url;
      }
    });

    if (environment.production) {
      angulartics2GoogleAnalytics.startTracking();
    }
  }

  doLogin() {
    this.keycloak.login({
      redirectUri: window.location.href,
      locale: this.languageService.language
    })
  }

  public signOut() {
    this.auth.signOut().subscribe({
      error: error => {
        console.log(error);
      }
    });

    return false;
  }

  public isActive(id: number): Observable<boolean> {
    return this.pageEnv.isActive(id);
  }

  public showOnlineUsers() {
    this.modalService.open(UsersOnlineComponent, {
      size: 'lg',
      centered: true
    });

    return false;
  }
}
