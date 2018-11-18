import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import { AboutComponent } from './about/about.component';
import { AccountAccessComponent } from './account/access/access.component';
import { AuthGuard } from './auth.guard';
import { AccountAccountsComponent } from './account/accounts/accounts.component';
import { AccountContactsComponent } from './account/contacts/contacts.component';
import { AccountDeleteComponent } from './account/delete/delete.component';
import { AccountDeletedComponent } from './account/delete/deleted/deleted.component';
import { AccountEmailComponent } from './account/email/email.component';
import { AccountInboxPicturesComponent } from './account/inbox-pictures/inbox-pictures.component';
import { AccountEmailcheckComponent } from './account/emailcheck/emailcheck.component';
import { AccountMessagesComponent } from './account/messages/messages.component';
import { AccountProfileComponent } from './account/profile/profile.component';
import { AccountComponent } from './account/account.component';
import { AccountSpecsConflictsComponent } from './account/specs-conflicts/specs-conflicts.component';
import { ArticlesArticleComponent } from './articles/article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { BrandsComponent } from './brands/brands.component';
import { CarsAttrsChangeLogComponent } from './cars/attrs-change-log/attrs-change-log.component';
import { CarsDatelessComponent } from './cars/dateless/dateless.component';
import { CarsEngineSelectComponent } from './cars/specifications-editor/engine/select/select.component';
import { CarsSpecificationsEditorComponent } from './cars/specifications-editor/specifications-editor.component';
import { CarsSpecsAdminComponent } from './cars/specs-admin/specs-admin.component';
import { ChartComponent } from './chart/chart.component';
import { CutawayComponent } from './cutaway/cutaway.component';
import { DonateLogComponent } from './donate/log/log.component';
import { DonateSuccessComponent } from './donate/success/success.component';
import { DonateVodSelectComponent } from './donate/vod/select/select.component';
import { DonateVodSuccessComponent } from './donate/vod/success/success.component';
import { DonateVodComponent } from './donate/vod/vod.component';
import { DonateComponent } from './donate/donate.component';
import { FactoryItemsComponent } from './factories/items/items.component';
import { FactoryComponent } from './factories/factories.component';
import { FeedbackSentComponent } from './feedback/sent/sent.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ForumsMoveMessageComponent } from './forums/move-message/move-message.component';
import { ForumsMoveTopicComponent } from './forums/move-topic/move-topic.component';
import { ForumsNewTopicComponent } from './forums/new-topic/new-topic.component';
import { ForumsSubscriptionsComponent } from './forums/subscriptions/subscriptions.component';
import { ForumsTopicComponent } from './forums/topic/topic.component';
import { MessageComponent } from './forums/message/message.component';
import { ForumsComponent } from './forums/forums.component';
import { InboxComponent } from './inbox/inbox.component';
import { InfoSpecComponent } from './info/spec/spec.component';
import { InfoTextComponent } from './info/text/text.component';
import { LogComponent } from './log/log.component';
import { SignInComponent } from './signin/signin.component';
import { MapComponent } from './map/map.component';
import { MascotsComponent } from './mascots/mascots.component';
import { ModerCommentsComponent } from './moder/comments/comments.component';
import { ModerGuard } from './moder.guard';
import { ModerItemParentComponent } from './moder/item-parent/item-parent.component';
import { ModerItemsAlphaComponent } from './moder/items/alpha/alpha.component';
import { ModerItemsTooBigComponent } from './moder/items/too-big/too-big.component';
import { ModerItemsNewComponent } from './moder/items/new/new.component';
import { ModerItemsItemOrganizeComponent } from './moder/items/item/catalogue/organize/organize.component';
import { ModerItemsItemPicturesOrganizeComponent } from './moder/items/item/pictures/organize/organize.component';
import { ModerItemsItemSelectParentComponent } from './moder/items/item/select-parent/select-parent.component';
import { ModerItemsItemComponent } from './moder/items/item/item.component';
import { ModerItemsComponent } from './moder/items/items.component';
import { ModerPagesAddComponent } from './moder/pages/add/add.component';
import { ModerPagesEditComponent } from './moder/pages/edit/edit.component';
import { ModerPagesComponent } from './moder/pages/pages.component';
import { ModerPerspectivesComponent } from './moder/perspectives/perspectives.component';
import { ModerPictureVoteTemplatesComponent } from './moder/picture-vote-templates/picture-vote-templates.component';
import { ModerPicturesItemAreaComponent } from './moder/pictures/item/area/area.component';
import { ModerPicturesItemCropComponent } from './moder/pictures/item/crop/crop.component';
import { ModerPicturesItemMoveComponent } from './moder/pictures/item/move/move.component';
import { ModerPicturesItemComponent } from './moder/pictures/item/item.component';
import { ModerPicturesComponent } from './moder/pictures/pictures.component';
import { ModerRightsComponent } from './moder/rights/rights.component';
import { ModerStatComponent } from './moder/stat/stat.component';
import { ModerTrafficWhitelistComponent } from './moder/traffic/whitelist/whitelist.component';
import { ModerTrafficComponent } from './moder/traffic/traffic.component';
import { ModerUsersComponent } from './moder/users/users.component';
import { ModerHotlinksComponent } from './moder/hotlinks/hotlinks.component';
import { ModerAttrsAttributeComponent } from './moder/attrs/attribute/attribute.component';
import { ModerAttrsZoneComponent } from './moder/attrs/zone/zone.component';
import { ModerAttrsComponent } from './moder/attrs/attrs.component';
import { ModerIndexComponent } from './moder/index/index.component';
import { MostsComponent } from './mosts/mosts.component';
import { MuseumComponent } from './museum/museum.component';
import { NewComponent } from './new/new.component';
import { NewItemComponent } from './new/item/item.component';
import { PersonsAuthorsComponent } from './persons/authors/authors.component';
import { PersonsPersonComponent } from './persons/person/person.component';
import { PersonsComponent } from './persons/persons.component';
import { PulseComponent } from './pulse/pulse.component';
import { RestorePasswordNewOkComponent } from './restore-password/new/ok/ok.component';
import { RestorePasswordNewComponent } from './restore-password/new/new.component';
import { RestorePasswordSentComponent } from './restore-password/sent/sent.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { RulesComponent } from './rules/rules.component';
import { SignupOkComponent } from './signup/ok/ok.component';
import { SignupComponent } from './signup/signup.component';
import { TelegramComponent } from './telegram/telegram.component';
import { TopViewComponent } from './top-view/top-view.component';
import { UploadSelectComponent } from './upload/select/select.component';
import { UploadComponent } from './upload/upload.component';
import { UsersRatingComponent } from './users/rating/rating.component';
import { UsersUserCommentsComponent } from './users/user/comments/comments.component';
import { UsersUserPicturesBrandComponent } from './users/user/pictures/brand/brand.component';
import { UsersUserPicturesComponent } from './users/user/pictures/pictures.component';
import { UsersUserComponent } from './users/user/user.component';
import { VotingComponent } from './voting/voting.component';
import { IndexComponent } from './index/index.component';
import { TwinsComponent } from './twins/twins.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  {
    path: 'account',
    children: [
      {
        path: 'access',
        component: AccountAccessComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accounts',
        component: AccountAccountsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contacts',
        component: AccountContactsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'delete',
        children: [
          { path: 'deleted', component: AccountDeletedComponent },
          {
            path: '',
            component: AccountDeleteComponent,
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'email',
        component: AccountEmailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'emailcheck/:token',
        component: AccountEmailcheckComponent
      },
      {
        path: 'inbox-pictures',
        component: AccountInboxPicturesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'messages',
        component: AccountMessagesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: AccountProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'specs-conflicts',
        component: AccountSpecsConflictsComponent,
        canActivate: [AuthGuard]
      },
      { path: '', component: AccountComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'articles',
    children: [
      { path: ':catname', component: ArticlesArticleComponent },
      { path: '', component: ArticlesComponent }
    ]
  },
  { path: 'brands', component: BrandsComponent },
  {
    path: 'cars',
    children: [
      {
        path: 'attrs-change-log',
        component: CarsAttrsChangeLogComponent
      },
      {
        path: 'dateless',
        component: CarsDatelessComponent
      },
      {
        path: 'select-engine',
        component: CarsEngineSelectComponent
      },
      {
        path: 'specifications-editor',
        component: CarsSpecificationsEditorComponent
      },
      {
        path: 'specs-admin',
        component: CarsSpecsAdminComponent
      }
    ]
  },
  { path: 'chart', component: ChartComponent },
  { path: 'cutaway', component: CutawayComponent },
  {
    path: 'donate',
    children: [
      { path: 'log', component: DonateLogComponent },
      { path: 'success', component: DonateSuccessComponent },
      {
        path: 'vod',
        children: [
          { path: 'select', component: DonateVodSelectComponent },
          { path: 'success', component: DonateVodSuccessComponent },
          { path: '', component: DonateVodComponent }
        ]
      },
      { path: '', component: DonateComponent }
    ]
  },
  {
    path: 'factories/:id',
    children: [
      { path: 'items', component: FactoryItemsComponent },
      { path: '', component: FactoryComponent }
    ]
  },
  {
    path: 'feedback',
    children: [
      { path: 'sent', component: FeedbackSentComponent },
      { path: '', component: FeedbackComponent }
    ]
  },
  {
    path: 'forums',
    children: [
      {
        path: 'move-message',
        component: ForumsMoveMessageComponent
      },
      {
        path: 'move-topic',
        component: ForumsMoveTopicComponent
      },
      {
        path: 'new-topic/:theme_id',
        component: ForumsNewTopicComponent
      },
      {
        path: 'subscriptions',
        component: ForumsSubscriptionsComponent
      },
      {
        path: 'topic/:topic_id',
        component: ForumsTopicComponent
      },
      {
        path: 'message/:message_id',
        component: MessageComponent
      },
      {
        path: ':theme_id',
        component: ForumsComponent
      },
      {
        path: '',
        component: ForumsComponent
      }
    ]
  },
  {
    path: 'inbox',
    children: [
      { path: '', component: InboxComponent },
      { path: ':brand', component: InboxComponent },
      { path: ':brand/:date', component: InboxComponent }
    ]
  },
  {
    path: 'info',
    children: [
      { path: 'spec', component: InfoSpecComponent },
      { path: 'text/:id', component: InfoTextComponent }
    ]
  },
  { path: 'log', component: LogComponent },
  { path: 'login', component: SignInComponent },
  { path: 'map', component: MapComponent },
  { path: 'mascots', component: MascotsComponent },
  {
    path: 'moder',
    children: [
      {
        path: 'comments',
        component: ModerCommentsComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'item-parent/:item_id/:parent_id',
        component: ModerItemParentComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'items',
        children: [
          {
            path: 'alpha',
            component: ModerItemsAlphaComponent,
            canActivate: [ModerGuard]
          },
          {
            path: 'too-big',
            component: ModerItemsTooBigComponent,
            canActivate: [ModerGuard]
          },
          {
            path: 'new',
            component: ModerItemsNewComponent,
            canActivate: [ModerGuard]
          },
          {
            path: 'item/:id',
            children: [
              {
                path: 'organize',
                component: ModerItemsItemOrganizeComponent,
                canActivate: [ModerGuard]
              },
              {
                path: 'organize-pictures',
                component: ModerItemsItemPicturesOrganizeComponent,
                canActivate: [ModerGuard]
              },
              {
                path: 'select-parent',
                component: ModerItemsItemSelectParentComponent,
                canActivate: [ModerGuard]
              },
              {
                path: '',
                component: ModerItemsItemComponent,
                canActivate: [ModerGuard]
              }
            ]
          },
          {
            path: '',
            component: ModerItemsComponent,
            canActivate: [ModerGuard]
          }
        ]
      },
      {
        path: 'pages',
        children: [
          {
            path: 'add',
            component: ModerPagesAddComponent,
            canActivate: [ModerGuard]
          },
          {
            path: 'edit',
            component: ModerPagesEditComponent,
            canActivate: [ModerGuard]
          },
          {
            path: '',
            component: ModerPagesComponent,
            canActivate: [ModerGuard]
          }
        ]
      },
      {
        path: 'perspectives',
        component: ModerPerspectivesComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'picture-vote-templates',
        component: ModerPictureVoteTemplatesComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'pictures',
        children: [
          {
            path: ':id',
            children: [
              {
                path: 'area',
                component: ModerPicturesItemAreaComponent,
                canActivate: [ModerGuard]
              },
              {
                path: 'crop',
                component: ModerPicturesItemCropComponent,
                canActivate: [ModerGuard]
              },
              {
                path: 'move',
                component: ModerPicturesItemMoveComponent,
                canActivate: [ModerGuard]
              },
              {
                path: '',
                component: ModerPicturesItemComponent,
                canActivate: [ModerGuard]
              }
            ]
          },
          {
            path: '',
            component: ModerPicturesComponent,
            canActivate: [ModerGuard]
          }
        ]
      },
      {
        path: 'rights',
        component: ModerRightsComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'stat',
        component: ModerStatComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'traffic',
        children: [
          {
            path: 'whitelist',
            component: ModerTrafficWhitelistComponent,
            canActivate: [ModerGuard]
          },
          {
            path: '',
            component: ModerTrafficComponent,
            canActivate: [ModerGuard]
          }
        ]
      },
      {
        path: 'users',
        component: ModerUsersComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'hotlinks',
        component: ModerHotlinksComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'attrs',
        children: [
          {
            path: 'attribute/:id',
            component: ModerAttrsAttributeComponent,
            canActivate: [ModerGuard]
          },
          {
            path: 'zone/:id',
            component: ModerAttrsZoneComponent,
            canActivate: [ModerGuard]
          },
          {
            path: '',
            component: ModerAttrsComponent,
            canActivate: [ModerGuard]
          }
        ]
      },
      {
        path: '',
        component: ModerIndexComponent,
        canActivate: [ModerGuard]
      }
    ]
  },
  {
    path: 'mosts',
    children: [
      {
        path: '',
        component: MostsComponent
      },
      {
        path: ':rating_catname',
        component: MostsComponent
      },
      {
        path: ':rating_catname/:type_catname',
        component: MostsComponent
      },
      {
        path: ':rating_catname/:type_catname/:years_catname',
        component: MostsComponent
      }
    ]
  },
  { path: 'museums/:id', component: MuseumComponent },
  {
    path: 'new',
    children: [
      {
        path: ':date',
        component: NewComponent
      },
      {
        path: ':date/:page',
        component: NewComponent
      },
      {
        path: ':date/item/:item_id',
        component: NewItemComponent
      },
      {
        path: ':date/item/:item_id/:page',
        component: NewItemComponent
      },
      {
        path: '',
        component: NewComponent
      }
    ]
  },
  {
    path: 'persons',
    children: [
      {
        path: 'authors',
        component: PersonsAuthorsComponent
      },
      {
        path: ':id',
        component: PersonsPersonComponent
      },
      {
        path: '',
        component: PersonsComponent
      }
    ]
  },
  { path: 'pulse', component: PulseComponent },
  {
    path: 'restore-password',
    children: [
      {
        path: 'new',
        children: [
          { path: 'ok', component: RestorePasswordNewOkComponent },
          { path: '', component: RestorePasswordNewComponent }
        ]
      },
      {
        path: 'sent',
        component: RestorePasswordSentComponent
      },
      {
        path: '',
        component: RestorePasswordComponent
      }
    ]
  },
  { path: 'rules', component: RulesComponent },
  {
    path: 'signup',
    children: [
      { path: 'ok', component: SignupOkComponent },
      { path: '', component: SignupComponent }
    ]
  },
  { path: 'telegram', component: TelegramComponent },
  {
    path: 'twins',
    children: [
      { path: ':brand', component: TwinsComponent },
      { path: '', component: TwinsComponent }
    ]
  },
  { path: 'top-view', component: TopViewComponent },
  {
    path: 'upload',
    children: [
      { path: 'select', component: UploadSelectComponent },
      { path: '', component: UploadComponent }
    ]
  },
  {
    path: 'users',
    children: [
      {
        path: 'rating',
        children: [
          {
            path: ':rating',
            component: UsersRatingComponent
          },
          {
            path: '',
            component: UsersRatingComponent
          }
        ]
      },
      {
        path: ':identity',
        children: [
          { path: 'comments', component: UsersUserCommentsComponent },
          {
            path: 'pictures',
            children: [
              { path: ':brand', component: UsersUserPicturesBrandComponent },
              { path: '', component: UsersUserPicturesComponent }
            ]
          },
          { path: '', component: UsersUserComponent }
        ]
      }
    ]
  },
  { path: 'voting/:id', component: VotingComponent },
  { path: '', component: IndexComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {  } // enableTracing: true <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
