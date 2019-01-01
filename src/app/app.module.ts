import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateCompiler } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule, BytesPipe } from 'ngx-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutosizeModule } from 'ngx-autosize';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './not-found.component';
import { SignInComponent } from './signin/signin.component';

import { ModerMenuComponent } from './moder-menu.component';
import { AuthGuard } from './auth.guard';
import { APIService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { ACLService, APIACL } from './services/acl.service';
import { BrandsComponent } from './brands/brands.component';
import { CarsAttrsChangeLogComponent } from './cars/attrs-change-log/attrs-change-log.component';
import { CarsDatelessComponent } from './cars/dateless/dateless.component';
import { CarsSpecificationsEditorComponent } from './cars/specifications-editor/specifications-editor.component';
import { CarsSpecsAdminComponent } from './cars/specs-admin/specs-admin.component';
import { CutawayComponent } from './cutaway/cutaway.component';
import { InboxComponent } from './inbox/inbox.component';
import { InfoSpecComponent } from './info/spec/spec.component';
import { InfoTextComponent } from './info/text/text.component';
import { LogComponent } from './log/log.component';
import { MascotsComponent } from './mascots/mascots.component';
import { MostsComponent } from './mosts/mosts.component';
import { NewComponent } from './new/new.component';
import { NewItemComponent } from './new/item/item.component';
import { RulesComponent } from './rules/rules.component';
import { TelegramComponent } from './telegram/telegram.component';
import { TopViewComponent } from './top-view/top-view.component';
import { NewListItemComponent } from './new/list-item/list-item.component';
import { PictureService } from './services/picture';
import { ItemService } from './services/item';
import { InboxService } from './services/inbox';
import { ReCaptchaService } from './services/recaptcha';
import { ItemParentService } from './services/item-parent';
import { ItemLinkService } from './services/item-link';
import { ItemLanguageService } from './services/item-language';
import { InfoSpecRowComponent } from './info/spec/row/row.component';
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
import { MessageDialogService } from './services/message-dialog';
import { AttrsService } from './services/attrs';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { PageEnvService } from './services/page-env.service';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ContentLanguageService } from './services/content-language';
import { LanguageService } from './services/language';
import { VehicleTypesModalComponent } from './components/vehicle-types-modal/vehicle-types-modal.component';
import { CarsSpecificationsEditorEngineComponent } from './cars/specifications-editor/engine/engine.component';
import { CarsEngineSelectComponent } from './cars/specifications-editor/engine/select/select.component';
import { CarsSelectEngineTreeItemComponent } from './cars/specifications-editor/engine/select/tree-item/tree-item.component';
import { CarsSpecificationsEditorResultComponent } from './cars/specifications-editor/result/result.component';
import { CarsSpecificationsEditorSpecComponent } from './cars/specifications-editor/spec/spec.component';
import { MostsService } from './services/mosts';
import { TimezoneService } from './services/timezone';
import { Error403Component } from './error/403/403.component';
import { Error404Component } from './error/404/404.component';
import { UsersOnlineComponent } from './users/online/online.component';
import { BrandsItemComponent } from './brands/item/item.component';

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

// AoT requires an exported function for factories
/* export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/ng2/i18n/', '.json');
}*/

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    CarsAttrsChangeLogComponent,
    CarsDatelessComponent,
    CarsEngineSelectComponent,
    CarsSpecificationsEditorComponent,
    CarsSpecsAdminComponent,
    CutawayComponent,
    InboxComponent,
    IndexComponent,
    InfoSpecComponent,
    InfoTextComponent,
    LogComponent,
    MascotsComponent,
    MostsComponent,
    NewComponent,
    NewItemComponent,
    PageNotFoundComponent,
    RulesComponent,
    ModerMenuComponent,
    SignInComponent,
    TelegramComponent,
    TopViewComponent,
    NewListItemComponent,
    InfoSpecRowComponent,
    CarsSelectEngineTreeItemComponent,
    ModalMessageComponent,
    BreadcrumbsComponent,
    VehicleTypesModalComponent,
    CarsSpecificationsEditorEngineComponent,
    CarsSpecificationsEditorResultComponent,
    CarsSpecificationsEditorSpecComponent,
    Error403Component,
    Error404Component,
    UsersOnlineComponent,
    BrandsItemComponent
  ],
  entryComponents: [
    ModalMessageComponent,
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
    NgbModule.forRoot(),
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
    AutosizeModule,
    UtilsModule,
    ThumbnailModule,
    MarkdownEditModule,
    PictureModerVoteModule,
    ItemModule
  ],
  providers: [
    APIService,
    APIACL,
    AuthService,
    AuthGuard,
    ACLService,
    PictureService,
    ItemService,
    InboxService,
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
    MessageDialogService,
    AttrsService,
    PageEnvService,
    ContentLanguageService,
    LanguageService,
    MostsService,
    TimezoneService,
    IpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
