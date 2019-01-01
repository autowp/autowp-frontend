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
import { InfoSpecComponent } from './info/spec/spec.component';
import { InfoTextComponent } from './info/text/text.component';
import { LogComponent } from './log/log.component';
import { SignInComponent } from './signin/signin.component';
import { MascotsComponent } from './mascots/mascots.component';
import { RulesComponent } from './rules/rules.component';
import { TelegramComponent } from './telegram/telegram.component';
import { TopViewComponent } from './top-view/top-view.component';
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
    loadChildren: './inbox/inbox.module#InboxModule'
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
    loadChildren: './mosts/mosts.module#MostsModule'
  },
  { path: 'museums', loadChildren: './museum/museum.module#MuseumModule' },
  {
    path: 'new',
    loadChildren: './new/new.module#NewModule'
  },
  {
    path: 'persons',
    loadChildren: './persons/persons.module#PersonsModule'
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
    loadChildren: './users/users.module#UsersModule'
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
