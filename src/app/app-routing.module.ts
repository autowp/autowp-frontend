import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
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
import { BrandsComponent } from './brands/brands.component';
import { CarsAttrsChangeLogComponent } from './cars/attrs-change-log/attrs-change-log.component';
import { CarsDatelessComponent } from './cars/dateless/dateless.component';
import { CarsEngineSelectComponent } from './cars/specifications-editor/engine/select/select.component';
import { CarsSpecificationsEditorComponent } from './cars/specifications-editor/specifications-editor.component';
import { CarsSpecsAdminComponent } from './cars/specs-admin/specs-admin.component';
import { CutawayComponent } from './cutaway/cutaway.component';
import { FeedbackSentComponent } from './feedback/sent/sent.component';
import { FeedbackComponent } from './feedback/feedback.component';
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
import { ModerPagesAddComponent } from './moder/pages/add/add.component';
import { ModerPagesEditComponent } from './moder/pages/edit/edit.component';
import { ModerPagesComponent } from './moder/pages/pages.component';
import { ModerPerspectivesComponent } from './moder/perspectives/perspectives.component';
import { ModerPictureVoteTemplatesComponent } from './moder/picture-vote-templates/picture-vote-templates.component';
import { ModerRightsComponent } from './moder/rights/rights.component';
import { ModerStatComponent } from './moder/stat/stat.component';
import { ModerUsersComponent } from './moder/users/users.component';
import { ModerAttrsAttributeComponent } from './moder/attrs/attribute/attribute.component';
import { ModerAttrsZoneComponent } from './moder/attrs/zone/zone.component';
import { ModerAttrsComponent } from './moder/attrs/attrs.component';
import { ModerIndexComponent } from './moder/index/index.component';
import { MostsComponent } from './mosts/mosts.component';
import { NewComponent } from './new/new.component';
import { NewItemComponent } from './new/item/item.component';
import { PersonsAuthorsComponent } from './persons/authors/authors.component';
import { PersonsPersonComponent } from './persons/person/person.component';
import { PersonsComponent } from './persons/persons.component';
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
import { TwinsGroupComponent } from './twins/twins-group.component';
import { TwinsGroupPicturesComponent } from './twins/twins-group-pictures.component';
import { TwinsGroupSpecificationsComponent } from './twins/twins-group-specifications.component';
import { CategoriesIndexComponent } from './categories/index.component';
import { CategoriesCategoryPicturesComponent } from './categories/category-pictures.component';
import { categoriesPathMatcher, categoriesPicturesPathMatcher } from './categories/matcher';
import { CategoriesCategoryItemComponent } from './categories/category-item.component';

const appRoutes: Routes = [
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
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
    loadChildren: './articles/articles.module#ArticlesModule'
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
  {
    path: 'category',
    children: [
      {
        path: ':category',
        children: [
          {
            matcher: categoriesPathMatcher,
            component: CategoriesCategoryItemComponent
          },
          {
            matcher: categoriesPicturesPathMatcher,
            component: CategoriesCategoryPicturesComponent
          },
          {
            path: '',
            pathMatch: 'full',
            component: CategoriesCategoryItemComponent
          }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        component: CategoriesIndexComponent
      }
    ]
  },
  { path: 'chart', loadChildren: './chart/chart.module#ChartModule' },
  { path: 'cutaway', component: CutawayComponent },
  {
    path: 'donate',
    loadChildren: './donate/donate.module#DonateModule'
  },
  {
    path: 'factories',
    loadChildren: './factories/factories.module#FactoriesModule'
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
    loadChildren: './forums/forums.module#ForumsModule'
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
  { path: 'map', loadChildren: './map/map.module#MapModule' },
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
        loadChildren: './moder/items/items.module#ItemsModule'
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
        loadChildren: './moder/pictures/pictures.module#PicturesModule'
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
        loadChildren: './moder/traffic/traffic.module#TrafficModule'
      },
      {
        path: 'users',
        component: ModerUsersComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'hotlinks',
        loadChildren: './moder/hotlinks/hotlinks.module#HotlinksModule'
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
  { path: 'museums', loadChildren: './museum/museum.module#MuseumModule' },
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
  { path: 'pulse', loadChildren: './pulse/pulse.module#PulseModule' },
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
      {
        path: 'group',
        children: [
          {
            path: ':group',
            children: [
              { path: 'pictures', component: TwinsGroupPicturesComponent },
              { path: 'specifications', component: TwinsGroupSpecificationsComponent },
              { path: '', component: TwinsGroupComponent }
            ]
          }
        ]
      },
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
