import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateCompiler } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule, BytesPipe } from 'ngx-pipes';
import { FileUploadModule } from 'ng2-file-upload';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
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
import { ModerItemParentComponent } from './moder/item-parent/item-parent.component';
import { ModerItemsAlphaComponent } from './moder/items/alpha/alpha.component';
import { ModerItemsItemSelectParentComponent } from './moder/items/item/select-parent/select-parent.component';
import { ModerItemsItemComponent } from './moder/items/item/item.component';
import { ModerItemsComponent } from './moder/items/items.component';
import { ModerPagesAddComponent } from './moder/pages/add/add.component';
import { ModerPagesEditComponent } from './moder/pages/edit/edit.component';
import { ModerPagesComponent } from './moder/pages/pages.component';
import { ModerPictureVoteTemplatesComponent } from './moder/picture-vote-templates/picture-vote-templates.component';
import { ModerRightsComponent } from './moder/rights/rights.component';
import { ModerAttrsAttributeComponent } from './moder/attrs/attribute/attribute.component';
import { ModerAttrsZoneComponent } from './moder/attrs/zone/zone.component';
import { ModerAttrsComponent } from './moder/attrs/attrs.component';
import { AccountComponent } from './account/account.component';
import { AccountAccessComponent } from './account/access/access.component';
import { AccountAccountsComponent } from './account/accounts/accounts.component';
import { AccountContactsComponent } from './account/contacts/contacts.component';
import { AccountDeleteComponent } from './account/delete/delete.component';
import { AccountDeletedComponent } from './account/delete/deleted/deleted.component';
import { AccountEmailComponent } from './account/email/email.component';
import { AccountEmailcheckComponent } from './account/emailcheck/emailcheck.component';
import { AccountInboxPicturesComponent } from './account/inbox-pictures/inbox-pictures.component';
import { AccountMessagesComponent } from './account/messages/messages.component';
import { AccountProfileComponent } from './account/profile/profile.component';
import { AccountSidebarComponent } from './account/sidebar/sidebar.component';
import { AccountSpecsConflictsComponent } from './account/specs-conflicts/specs-conflicts.component';
import { BrandsComponent } from './brands/brands.component';
import { CarsAttrsChangeLogComponent } from './cars/attrs-change-log/attrs-change-log.component';
import { CarsDatelessComponent } from './cars/dateless/dateless.component';
import { CarsSpecificationsEditorComponent } from './cars/specifications-editor/specifications-editor.component';
import { CarsSpecsAdminComponent } from './cars/specs-admin/specs-admin.component';
import { ChartComponent } from './chart/chart.component';
import { CutawayComponent } from './cutaway/cutaway.component';
import { FactoryComponent } from './factories/factories.component';
import { FactoryItemsComponent } from './factories/items/items.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackSentComponent } from './feedback/sent/sent.component';
import { InboxComponent } from './inbox/inbox.component';
import { InfoSpecComponent } from './info/spec/spec.component';
import { InfoTextComponent } from './info/text/text.component';
import { LogComponent } from './log/log.component';
import { MapComponent } from './map/map.component';
import { MascotsComponent } from './mascots/mascots.component';
import { MostsComponent } from './mosts/mosts.component';
import { MuseumComponent } from './museum/museum.component';
import { NewComponent } from './new/new.component';
import { NewItemComponent } from './new/item/item.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonsAuthorsComponent } from './persons/authors/authors.component';
import { PersonsPersonComponent } from './persons/person/person.component';
import { PulseComponent } from './pulse/pulse.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { RestorePasswordNewComponent } from './restore-password/new/new.component';
import { RestorePasswordNewOkComponent } from './restore-password/new/ok/ok.component';
import { RestorePasswordSentComponent } from './restore-password/sent/sent.component';
import { RulesComponent } from './rules/rules.component';
import { SignupComponent } from './signup/signup.component';
import { SignupOkComponent } from './signup/ok/ok.component';
import { TelegramComponent } from './telegram/telegram.component';
import { TopViewComponent } from './top-view/top-view.component';
import { UploadComponent } from './upload/upload.component';
import { UploadSelectComponent } from './upload/select/select.component';
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
import { ModerItemsTooBigComponent } from './moder/items/too-big/too-big.component';
import { ModerItemsNewComponent } from './moder/items/new/new.component';
import { ItemLanguageService } from './services/item-language';
import { ModerItemsItemTreeComponent } from './moder/items/item/tree/tree.component';
import { ModerItemsItemSelectParentTreeItemComponent } from './moder/items/item/select-parent/tree-item/tree-item.component';
import { ModerItemsItemSelectParentTreeComponent } from './moder/items/item/select-parent/tree/tree.component';
import { ModerAttrsAttributeListComponent } from './moder/attrs/attribute-list/attribute-list.component';
import { ModerAttrsZoneAttributeListComponent } from './moder/attrs/zone/attribute-list/attribute-list.component';
import { ModerAttrsAttributeListOptionsTreeComponent } from './moder/attrs/attribute/list-options-tree/list-options-tree.component';
import { InfoSpecRowComponent } from './info/spec/row/row.component';
import { UploadSelectTreeItemComponent } from './upload/select/tree-item/tree-item.component';
import { VotingService } from './services/voting';
import { ItemComponent } from './components/item/item.component';
import { ItemMetaFormComponent } from './components/item-meta-form/item-meta-form.component';
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
import { ModerItemsItemCatalogueComponent } from './moder/items/item/catalogue/catalogue.component';
import { ModerItemsItemMetaComponent } from './moder/items/item/meta/meta.component';
import { ModerItemsItemLinksComponent } from './moder/items/item/links/links.component';
import { ModerItemsItemNameComponent } from './moder/items/item/name/name.component';
import { ModerItemsItemLogoComponent } from './moder/items/item/logo/logo.component';
import { ModerItemsItemPicturesComponent } from './moder/items/item/pictures/pictures.component';
import { ModerItemsItemVehiclesComponent } from './moder/items/item/vehicles/vehicles.component';
import { ModerItemsItemOrganizeComponent } from './moder/items/item/catalogue/organize/organize.component';
import { ModerItemsItemPicturesOrganizeComponent } from './moder/items/item/pictures/organize/organize.component';
import { CarsSpecificationsEditorEngineComponent } from './cars/specifications-editor/engine/engine.component';
import { CarsEngineSelectComponent } from './cars/specifications-editor/engine/select/select.component';
import { CarsSelectEngineTreeItemComponent } from './cars/specifications-editor/engine/select/tree-item/tree-item.component';
import { CarsSpecificationsEditorResultComponent } from './cars/specifications-editor/result/result.component';
import { CarsSpecificationsEditorSpecComponent } from './cars/specifications-editor/spec/spec.component';
import { VotingVotesComponent } from './voting/votes/votes.component';
import { MapPopupComponent } from './map/popup/popup.component';
import { MostsService } from './services/mosts';
import { TimezoneService } from './services/timezone';
import { Error403Component } from './error/403/403.component';
import { Error404Component } from './error/404/404.component';
import { UploadCropComponent } from './upload/crop/crop.component';
import { UsersOnlineComponent } from './users/online/online.component';
import { ModerGuard } from './moder.guard';
import { BrandsItemComponent } from './brands/item/item.component';

import { AppRoutingModule } from './app-routing.module';
import { IpService } from './services/ip';
import { TwinsComponent } from './twins/twins.component';
import { TwinsService } from './services/twins';
import { TwinsGroupComponent } from './twins/twins-group.component';
import { TwinsSidebarComponent } from './twins/sidebar.component';
import { TwinsItemComponent } from './twins/item/item.component';
import { TwinsGroupPicturesComponent } from './twins/twins-group-pictures.component';
import { TwinsGroupPicturesThumbnailComponent } from './twins/thumbnail/thumbnail.component';
import { TwinsGroupSpecificationsComponent } from './twins/twins-group-specifications.component';
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

// AoT requires an exported function for factories
/* export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/ng2/i18n/', '.json');
}*/

@NgModule({
  declarations: [
    AccountComponent,
    AccountAccessComponent,
    AccountAccountsComponent,
    AccountContactsComponent,
    AccountDeleteComponent,
    AccountDeletedComponent,
    AccountEmailComponent,
    AccountEmailcheckComponent,
    AccountInboxPicturesComponent,
    AccountMessagesComponent,
    AccountProfileComponent,
    AccountSidebarComponent,
    AccountSpecsConflictsComponent,
    AppComponent,
    BrandsComponent,
    CarsAttrsChangeLogComponent,
    CarsDatelessComponent,
    CarsEngineSelectComponent,
    CarsSpecificationsEditorComponent,
    CarsSpecsAdminComponent,
    ChartComponent,
    CutawayComponent,
    FactoryComponent,
    FactoryItemsComponent,
    FeedbackComponent,
    FeedbackSentComponent,
    InboxComponent,
    IndexComponent,
    InfoSpecComponent,
    InfoTextComponent,
    LogComponent,
    MapComponent,
    MascotsComponent,
    MostsComponent,
    MuseumComponent,
    NewComponent,
    NewItemComponent,
    PageNotFoundComponent,
    PersonsComponent,
    PersonsAuthorsComponent,
    PersonsPersonComponent,
    PulseComponent,
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
    UploadComponent,
    UploadSelectComponent,
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
    ModerItemParentComponent,
    ModerItemsComponent,
    ModerItemsAlphaComponent,
    ModerItemsItemComponent,
    ModerItemsItemOrganizeComponent,
    ModerItemsItemPicturesOrganizeComponent,
    ModerItemsItemSelectParentComponent,
    ModerPagesComponent,
    ModerPagesAddComponent,
    ModerPagesEditComponent,
    ModerPictureVoteTemplatesComponent,
    ModerRightsComponent,
    NewListItemComponent,
    ModerRightsTreeComponent,
    ModerItemsTooBigComponent,
    ModerItemsNewComponent,
    ModerItemsItemTreeComponent,
    ModerItemsItemSelectParentTreeItemComponent,
    ModerItemsItemSelectParentTreeComponent,
    ModerAttrsAttributeListComponent,
    ModerAttrsZoneAttributeListComponent,
    ModerAttrsAttributeListOptionsTreeComponent,
    InfoSpecRowComponent,
    UploadSelectTreeItemComponent,
    CarsSelectEngineTreeItemComponent,
    ItemComponent,
    ItemMetaFormComponent,
    ModalMessageComponent,
    ModerStatComponent,
    BreadcrumbsComponent,
    VehicleTypesModalComponent,
    ModerItemsItemCatalogueComponent,
    ModerItemsItemMetaComponent,
    ModerItemsItemLinksComponent,
    ModerItemsItemNameComponent,
    ModerItemsItemLogoComponent,
    ModerItemsItemPicturesComponent,
    ModerItemsItemVehiclesComponent,
    CarsSpecificationsEditorEngineComponent,
    CarsSpecificationsEditorResultComponent,
    CarsSpecificationsEditorSpecComponent,
    VotingVotesComponent,
    MapPopupComponent,
    Error403Component,
    Error404Component,
    UploadCropComponent,
    UsersOnlineComponent,
    BrandsItemComponent,
    TwinsComponent,
    TwinsGroupComponent,
    TwinsSidebarComponent,
    TwinsItemComponent,
    TwinsGroupPicturesComponent,
    TwinsGroupPicturesThumbnailComponent,
    TwinsGroupSpecificationsComponent,
    CategoriesIndexComponent,
    CategoriesCategoryPicturesComponent,
    CategoriesCategoryItemComponent,
    CategoriesListItemComponent
  ],
  entryComponents: [
    ModalMessageComponent,
    VehicleTypesModalComponent,
    VotingVotesComponent,
    MapPopupComponent,
    UploadCropComponent,
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
    FileUploadModule,
    ChartsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    BrowserAnimationsModule,
    LeafletModule.forRoot(),
    AutosizeModule,
    UtilsModule,
    ThumbnailModule,
    MarkdownEditModule,
    PictureModerVoteModule
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
    IpService,
    TwinsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
