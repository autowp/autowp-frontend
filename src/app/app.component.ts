import { Component, OnInit } from '@angular/core';

import { Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { ACLService } from './services/acl.service';
import Notify from './notify';
import { APIUser } from './services/user';
import { MessageService } from './services/message';
import { Page, PageService } from './services/page';
import { PageEnvService, LayoutParams } from './services/page-env.service';
import { Observable } from 'rxjs';
import { LanguageService, Language } from './services/language';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  private languages: Language[] = [];
  public layoutParams$: Observable<LayoutParams>;
  public loginInvalidParams: any;
  public user: APIUser;
  public isModer; // = opt.isModer;
  public newPersonalMessages; // = opt.sidebar.newPersonalMessages;
  public searchHostname: string;
  public mainMenuItems: Page[] = [];
  public secondaryMenuItems: Page[] = [];
  public mainInSecondaryItems: Page[] = [];
  public categories = [];
  public moderMenu; // = opt.moderMenu;
  public loginForm = {
    login: '',
    password: '',
    remember: false
  };
  public language: string;
  public urlPath = '/';

  constructor(
    public auth: AuthService,
    public acl: ACLService,
    private router: Router,
    private translate: TranslateService,
    private pages: PageService,
    private messageService: MessageService,
    private pageEnv: PageEnvService,
    private languageService: LanguageService
  ) {
    this.language = this.languageService.getLanguage();
    console.log(this.language);
    this.translate.setTranslation(
      this.language,
      require('../languages/' + this.language + '.json')
    );
    this.translate.setDefaultLang(this.language);

    this.translate.use(this.language);

    this.layoutParams$ = this.pageEnv.layoutParams$.asObservable();

    this.auth.loadMe().subscribe();

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
      this.urlPath = val.url;
    });
  }

  ngOnInit() {
    this.mainInSecondaryItems = [];
    this.pages.getMenu(2).subscribe(items => {
      this.mainMenuItems = items;
      for (const page of this.mainMenuItems) {
        if (this.isSecondaryMenuItem(page)) {
          this.mainInSecondaryItems.push(page);
        }
      }
    });

    this.pages.getMenu(87).subscribe(items => {
      this.secondaryMenuItems = items;
    });

    this.messageService.getNew().subscribe(value => {
      this.newPersonalMessages = value;
    });
  }

  isSecondaryMenuItem(page: Page): boolean {
    return [25, 117, 42].indexOf(page.id) !== -1;
  }

  doLogin() {
    this.auth
      .login(
        this.loginForm.login,
        this.loginForm.password,
        this.loginForm.remember
      )
      .subscribe(
        () => {
          this.router.navigate(['/login/ok']);
        },
        response => {
          if (response.status === 400) {
            this.loginInvalidParams = response.error.invalid_params;
          } else {
            Notify.response(response);
          }
        }
      );
  }

  signOut(event) {
    event.preventDefault();

    this.auth.signOut().subscribe(
      () => {},
      error => {
        console.log(error);
      }
    );
  }
}
