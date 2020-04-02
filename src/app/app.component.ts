import { Component, OnInit, Renderer2 } from '@angular/core';

import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { ACLService } from './services/acl.service';
import { APIUser } from './services/user';
import { MessageService } from './services/message';
import { PageEnvService, LayoutParams } from './services/page-env.service';
import { Observable } from 'rxjs';
import { LanguageService, Language } from './services/language';
import { ItemService } from './services/item';
import { UsersOnlineComponent } from './users/online/online.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {OAuthService} from './services/oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public languages: Language[] = [];
  public layoutParams$: Observable<LayoutParams>;
  public loginInvalidParams: any;
  public user: APIUser;
  public newPersonalMessages; // = opt.sidebar.newPersonalMessages;
  public searchHostname: string;
  public categories = [];
  public loginForm = {
    login: '',
    password: ''
  };
  public language: string;
  public urlPath = '/';
  public isNavbarCollapsed = true;

  constructor(
    public auth: AuthService,
    public acl: ACLService,
    private router: Router,
    private translate: TranslateService,
    private messageService: MessageService,
    private pageEnv: PageEnvService,
    private languageService: LanguageService,
    private itemService: ItemService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private oauth: OAuthService
  ) {
    this.oauth.restoreFromStorage();

    this.language = this.languageService.getLanguage();
    const ngxTranslateCode = this.languageService.getNgxTranslateLanguage();

    this.translate.setTranslation(
      ngxTranslateCode,
      require('../languages/' + this.language + '.json')
    );
    this.translate.setDefaultLang(ngxTranslateCode);

    this.translate.use(ngxTranslateCode);
    moment.locale(this.languageService.getMomentLocale());

    this.layoutParams$ = this.pageEnv.layoutParams$.asObservable();
    this.layoutParams$.subscribe(params => {
      if (params.isGalleryPage) {
        this.renderer.addClass(document.body, 'gallery');
      } else {
        this.renderer.removeClass(document.body, 'gallery');
      }
    });

    // this.auth.loadMe().subscribe();

    this.auth.getUser().subscribe(user => {
      this.user = user;
    });

    this.languages = this.languageService.getLanguages();
    let searchHostname = 'wheelsage.org';
    for (const itemLanguage of this.languages) {
      if (itemLanguage.code === this.language) {
        searchHostname = itemLanguage.hostname;
      }
    }

    this.searchHostname = searchHostname;

    router.events.subscribe((val: RouterEvent) => {
      if (val instanceof NavigationStart) {
        this.urlPath = val.url;
      }
    });
  }

  ngOnInit() {
    this.messageService.getNew().subscribe(value => {
      this.newPersonalMessages = value;
    });

    this.itemService
      .getItems({
        type_id: 3,
        no_parent: true,
        fields: 'name_text,catname,descendants_count',
        limit: 20
      })
      .subscribe(response => {
        this.categories = response.items;
      });
  }

  public doLogin() {
    this.auth
      .login(
        this.loginForm.login,
        this.loginForm.password
      )
      .subscribe(
        result => {
          if (! result) {
            this.translate.get('login/login-or-password-is-incorrect').subscribe(translation => {
              this.loginInvalidParams = {
                password: {
                  invalid: translation
                }
              };
            });
            return;
          }

          this.router.navigate(['/login']);
        },
        error => {
          this.loginInvalidParams = {
            password: {
              error: 'Error'
            }
          };
        }
      );
  }

  public signOut() {
    this.auth.signOut().subscribe(
      () => {},
      error => {
        console.log(error);
      }
    );

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
