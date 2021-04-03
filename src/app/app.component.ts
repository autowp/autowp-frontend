import { Component, OnInit, Renderer2 } from '@angular/core';

import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ACLService } from './services/acl.service';
import { APIUser } from './services/user';
import { MessageService } from './services/message';
import { PageEnvService, LayoutParams } from './services/page-env.service';
import { Observable } from 'rxjs';
import { LanguageService, Language } from './services/language';
import {APIItem, ItemService} from './services/item';
import { UsersOnlineComponent } from './users/online/online.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {environment} from '../environments/environment';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

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
  public categories: APIItem[] = [];
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
    private messageService: MessageService,
    private pageEnv: PageEnvService,
    private languageService: LanguageService,
    private itemService: ItemService,
    private modalService: NgbModal,
    private renderer: Renderer2,
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

    router.events.subscribe((val: RouterEvent) => {
      if (val instanceof NavigationStart) {
        this.urlPath = val.url;
      }
    });

    angulartics2GoogleAnalytics.startTracking();
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
            this.loginInvalidParams = {
              password: {
                invalid: $localize `Login or password is incorrect`
              }
            };
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
