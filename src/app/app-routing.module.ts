import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import { BrandsComponent } from './brands/brands.component';
import { CarsAttrsChangeLogComponent } from './cars/attrs-change-log/attrs-change-log.component';
import { CarsDatelessComponent } from './cars/dateless/dateless.component';
import { CarsEngineSelectComponent } from './cars/specifications-editor/engine/select/select.component';
import { CarsSpecificationsEditorComponent } from './cars/specifications-editor/specifications-editor.component';
import { CarsSpecsAdminComponent } from './cars/specs-admin/specs-admin.component';
import { CutawayComponent } from './cutaway/cutaway.component';
import { InboxComponent } from './inbox/inbox.component';
import { InfoSpecComponent } from './info/spec/spec.component';
import { InfoTextComponent } from './info/text/text.component';
import { LogComponent } from './log/log.component';
import { SignInComponent } from './signin/signin.component';
import { MascotsComponent } from './mascots/mascots.component';
import { MostsComponent } from './mosts/mosts.component';
import { NewComponent } from './new/new.component';
import { NewItemComponent } from './new/item/item.component';
import { PersonsAuthorsComponent } from './persons/authors/authors.component';
import { PersonsPersonComponent } from './persons/person/person.component';
import { PersonsComponent } from './persons/persons.component';
import { RulesComponent } from './rules/rules.component';
import { TelegramComponent } from './telegram/telegram.component';
import { TopViewComponent } from './top-view/top-view.component';
import { UsersRatingComponent } from './users/rating/rating.component';
import { UsersUserCommentsComponent } from './users/user/comments/comments.component';
import { UsersUserPicturesBrandComponent } from './users/user/pictures/brand/brand.component';
import { UsersUserPicturesComponent } from './users/user/pictures/pictures.component';
import { UsersUserComponent } from './users/user/user.component';
import { IndexComponent } from './index/index.component';

const appRoutes: Routes = [
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
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
    loadChildren: './categories/categories.module#CategoriesModule'
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
    loadChildren: './feedback/feedback.module#FeedbackModule'
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
    loadChildren: './moder/moder.module#ModerModule'
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
    loadChildren:
      './restore-password/restore-password.module#RestorePasswordModule'
  },
  { path: 'rules', component: RulesComponent },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule'
  },
  { path: 'telegram', component: TelegramComponent },
  {
    path: 'twins',
    loadChildren: './twins/twins.module#TwinsModule'
  },
  { path: 'top-view', component: TopViewComponent },
  { path: 'upload', loadChildren: './upload/upload.module#UploadModule' },
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
  { path: 'voting', loadChildren: './voting/voting.module#VotingModule' },
  { path: '', component: IndexComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {} // enableTracing: true <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
