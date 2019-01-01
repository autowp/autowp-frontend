import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateCompiler } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule, BytesPipe } from 'ngx-pipes';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutosizeModule } from 'ngx-autosize';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './not-found.component';
import { SignInComponent } from './signin/signin.component';
import { ModerIndexComponent } from './moder/index/index.component';

import { ModerMenuComponent } from './moder-menu.component';
import { AuthGuard } from './auth.guard';
import { ModerPerspectivesComponent } from './moder/perspectives/perspectives.component';
import { ModerUsersComponent } from './moder/users/users.component';
import { APIService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { ACLService, APIACL } from './services/acl.service';
import { ModerCommentsComponent } from './moder/comments/comments.component';
import { ModerPagesAddComponent } from './moder/pages/add/add.component';
import { ModerPagesEditComponent } from './moder/pages/edit/edit.component';
import { ModerPagesComponent } from './moder/pages/pages.component';
import { ModerPictureVoteTemplatesComponent } from './moder/picture-vote-templates/picture-vote-templates.component';
import { ModerRightsComponent } from './moder/rights/rights.component';
import { ModerAttrsAttributeComponent } from './moder/attrs/attribute/attribute.component';
import { ModerAttrsZoneComponent } from './moder/attrs/zone/zone.component';
import { ModerAttrsComponent } from './moder/attrs/attrs.component';
import { BrandsComponent } from './brands/brands.component';
import { CarsAttrsChangeLogComponent } from './cars/attrs-change-log/attrs-change-log.component';
import { CarsDatelessComponent } from './cars/dateless/dateless.component';
import { CarsSpecificationsEditorComponent } from './cars/specifications-editor/specifications-editor.component';
import { CarsSpecsAdminComponent } from './cars/specs-admin/specs-admin.component';
import { CutawayComponent } from './cutaway/cutaway.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackSentComponent } from './feedback/sent/sent.component';
import { InboxComponent } from './inbox/inbox.component';
import { InfoSpecComponent } from './info/spec/spec.component';
import { InfoTextComponent } from './info/text/text.component';
import { LogComponent } from './log/log.component';
import { MascotsComponent } from './mascots/mascots.component';
import { MostsComponent } from './mosts/mosts.component';
import { NewComponent } from './new/new.component';
import { NewItemComponent } from './new/item/item.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonsAuthorsComponent } from './persons/authors/authors.component';
import { PersonsPersonComponent } from './persons/person/person.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { RestorePasswordNewComponent } from './restore-password/new/new.component';
import { RestorePasswordNewOkComponent } from './restore-password/new/ok/ok.component';
import { RestorePasswordSentComponent } from './restore-password/sent/sent.component';
import { RulesComponent } from './rules/rules.component';
import { SignupComponent } from './signup/signup.component';
import { SignupOkComponent } from './signup/ok/ok.component';
import { TelegramComponent } from './telegram/telegram.component';
import { TopViewComponent } from './top-view/top-view.component';
import { UsersRatingComponent } from './users/rating/rating.component';
import { UsersUserComponent } from './users/user/user.component';
import { UsersUserCommentsComponent } from './users/user/comments/comments.component';
import { UsersUserPicturesComponent } from './users/user/pictures/pictures.component';
import { UsersUserPicturesBrandComponent } from './users/user/pictures/brand/brand.component';
import { VotingComponent } from './voting/voting.component';
import { NewListItemComponent } from './new/list-item/list-item.component';
import { PictureService } from './services/picture';
import { ItemService } from './services/item';
import { InboxService } from './services/inbox';
import { ReCaptchaService } from './services/recaptcha';
import { ItemParentService } from './services/item-parent';
import { ItemLinkService } from './services/item-link';
import { ModerRightsTreeComponent } from './moder/rights/tree/tree.component';
import { ItemLanguageService } from './services/item-language';
import { ModerAttrsAttributeListComponent } from './moder/attrs/attribute-list/attribute-list.component';
import { ModerAttrsZoneAttributeListComponent } from './moder/attrs/zone/attribute-list/attribute-list.component';
import { ModerAttrsAttributeListOptionsTreeComponent } from './moder/attrs/attribute/list-options-tree/list-options-tree.component';
import { InfoSpecRowComponent } from './info/spec/row/row.component';
import { VotingService } from './services/voting';
import { MessageService } from './services/message';
import { CommentService } from './services/comment';
import { PageService } from './services/page';
import { UserService } from './services/user';
import { DecimalPipe } from '@angular/common';
import { PerspectiveService } from './services/perspective';
import { PictureModerVoteService } from './services/picture-moder-vote';
import { PictureModerVoteTemplateService } from './services/picture-moder-vote-template';
import { VehicleTypeService } from './services/vehicle-type';
import { SpecService } from './services/spec';
import { PictureItemService } from './services/picture-item';
import { ContactsService } from './services/contacts';
import { MessageDialogService } from './services/message-dialog';
import { AttrsService } from './services/attrs';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { ModerStatComponent } from './moder/stat/stat.component';
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
import { VotingVotesComponent } from './voting/votes/votes.component';
import { MostsService } from './services/mosts';
import { TimezoneService } from './services/timezone';
import { Error403Component } from './error/403/403.component';
import { Error404Component } from './error/404/404.component';
import { UsersOnlineComponent } from './users/online/online.component';
import { ModerGuard } from './moder.guard';
import { BrandsItemComponent } from './brands/item/item.component';

import { AppRoutingModule } from './app-routing.module';
import { IpService } from './services/ip';
import { CategoriesIndexComponent } from './categories/index.component';
import { CategoriesCategoryPicturesComponent } from './categories/category-pictures.component';
import { CategoriesCategoryItemComponent } from './categories/category-item.component';
import { CategoriesListItemComponent } from './categories/list-item.component';
import { PaginatorModule } from './paginator/paginator.module';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { UtilsModule } from './utils/utils.module';
import { ThumbnailModule } from './thumbnail/thumbnail.module';
import { MarkdownEditModule } from './markdown-edit/markdown-edit.module';
import { PictureModerVoteModule } from './picture-moder-vote/picture-moder-vote.module';
import { ModerItemParentComponent } from './moder/item-parent/item-parent.component';
import { ItemModule } from './item/item.module';

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
    FeedbackComponent,
    FeedbackSentComponent,
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
    PersonsComponent,
    PersonsAuthorsComponent,
    PersonsPersonComponent,
    RestorePasswordComponent,
    RestorePasswordNewComponent,
    RestorePasswordNewOkComponent,
    RestorePasswordSentComponent,
    RulesComponent,
    ModerIndexComponent,
    ModerMenuComponent,
    SignInComponent,
    SignupComponent,
    SignupOkComponent,
    TelegramComponent,
    TopViewComponent,
    UsersRatingComponent,
    UsersUserComponent,
    UsersUserCommentsComponent,
    UsersUserPicturesComponent,
    UsersUserPicturesBrandComponent,
    VotingComponent,
    ModerPerspectivesComponent,
    ModerUsersComponent,
    ModerAttrsComponent,
    ModerAttrsAttributeComponent,
    ModerAttrsZoneComponent,
    ModerCommentsComponent,
    ModerPagesComponent,
    ModerPagesAddComponent,
    ModerPagesEditComponent,
    ModerPictureVoteTemplatesComponent,
    ModerRightsComponent,
    NewListItemComponent,
    ModerRightsTreeComponent,
    ModerAttrsAttributeListComponent,
    ModerAttrsZoneAttributeListComponent,
    ModerAttrsAttributeListOptionsTreeComponent,
    InfoSpecRowComponent,
    CarsSelectEngineTreeItemComponent,
    ModalMessageComponent,
    ModerStatComponent,
    BreadcrumbsComponent,
    VehicleTypesModalComponent,
    CarsSpecificationsEditorEngineComponent,
    CarsSpecificationsEditorResultComponent,
    CarsSpecificationsEditorSpecComponent,
    VotingVotesComponent,
    Error403Component,
    Error404Component,
    UsersOnlineComponent,
    BrandsItemComponent,
    CategoriesIndexComponent,
    CategoriesCategoryPicturesComponent,
    CategoriesCategoryItemComponent,
    CategoriesListItemComponent,
    ModerItemParentComponent
  ],
  entryComponents: [
    ModalMessageComponent,
    VehicleTypesModalComponent,
    VotingVotesComponent,
    UsersOnlineComponent
  ],
  imports: [
    CommentsModule,
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
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
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
    ModerGuard,
    ACLService,
    PictureService,
    ItemService,
    InboxService,
    ReCaptchaService,
    ItemParentService,
    ItemLinkService,
    ItemLanguageService,
    VotingService,
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
