import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateCompiler } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { MomentModule } from 'ngx-moment';
import { NgbModule, NgbTooltipModule, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule, BytesPipe } from 'ngx-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './not-found.component';

import { AuthGuard } from './auth.guard';
import { APIService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { ACLService, APIACL } from './services/acl.service';
import { PictureService } from './services/picture';
import { ItemService } from './services/item';
import { ReCaptchaService } from './services/recaptcha';
import { ItemParentService } from './services/item-parent';
import { ItemLinkService } from './services/item-link';
import { ItemLanguageService } from './services/item-language';
import { MessageService } from './services/message';
import { CommentService } from './services/comment';
import { PageService } from './services/page';
import { UserService } from './services/user';
import { DecimalPipe } from '@angular/common';
import { PerspectiveService } from './services/perspective';
import { VehicleTypeService } from './services/vehicle-type';
import { SpecService } from './services/spec';
import { PictureItemService } from './services/picture-item';
import { ContactsService } from './services/contacts';
import { PageEnvService } from './services/page-env.service';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ContentLanguageService } from './services/content-language';
import { LanguageService } from './services/language';
import { VehicleTypesModalComponent } from './components/vehicle-types-modal/vehicle-types-modal.component';
import { TimezoneService } from './services/timezone';
import { Error403Component } from './error/403/403.component';
import { Error404Component } from './error/404/404.component';
import { UsersOnlineComponent } from './users/online/online.component';

import { AppRoutingModule } from './app-routing.module';
import { IpService } from './services/ip';
import { PaginatorModule } from './paginator/paginator.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { ThumbnailModule } from './thumbnail/thumbnail.module';
import { MarkdownEditModule } from './markdown-edit/markdown-edit.module';
import { ItemModule } from './item/item.module';
import { PictureModerVoteModule } from './picture-moder-vote/picture-moder-vote.module';
import { PictureModerVoteService } from './services/picture-moder-vote';
import { PictureModerVoteTemplateService } from './services/picture-moder-vote-template';
import { ModerMenuModule } from './moder/menu/menu.module';

// AoT requires an exported function for factories
/* export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/ng2/i18n/', '.json');
}*/

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PageNotFoundComponent,
    BreadcrumbsComponent,
    VehicleTypesModalComponent,
    Error403Component,
    Error404Component,
    UsersOnlineComponent
  ],
  entryComponents: [
    VehicleTypesModalComponent,
    UsersOnlineComponent
  ],
  imports: [
    PaginatorModule,
    UserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      /*loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },*/
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    MomentModule,
    NgPipesModule,
    BrowserAnimationsModule,
    UtilsModule,
    ThumbnailModule,
    MarkdownEditModule,
    PictureModerVoteModule,
    ItemModule,
    ModerMenuModule,
    NgbTooltipModule,
    NgbCollapseModule,
    NgbDropdownModule
  ],
  providers: [
    APIService,
    APIACL,
    AuthService,
    AuthGuard,
    ACLService,
    PictureService,
    ItemService,
    ReCaptchaService,
    ItemParentService,
    ItemLinkService,
    ItemLanguageService,
    MessageService,
    CommentService,
    PageService,
    UserService,
    DecimalPipe,
    BytesPipe,
    PerspectiveService,
    PictureModerVoteService,
    PictureModerVoteTemplateService,
    VehicleTypeService,
    SpecService,
    PictureItemService,
    ContactsService,
    PageEnvService,
    ContentLanguageService,
    LanguageService,
    TimezoneService,
    IpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
