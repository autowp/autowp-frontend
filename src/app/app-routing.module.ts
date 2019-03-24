import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

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
  { path: 'brands', loadChildren: './brands/brands.module#BrandsModule' },
  {
    path: 'cars',
    loadChildren: './cars/cars.module#CarsModule'
  },
  {
    path: 'category',
    loadChildren: './categories/categories.module#CategoriesModule'
  },
  { path: 'chart', loadChildren: './chart/chart.module#ChartModule' },
  { path: 'cutaway', loadChildren: './cutaway/cutaway.module#CutawayModule' },
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
    loadChildren: './info/info.module#InfoModule'
  },
  { path: 'log', loadChildren: './log/log.module#LogModule' },
  { path: 'login', loadChildren: './signin/signin.module#SigninModule' },
  { path: 'map', loadChildren: './map/map.module#MapModule' },
  { path: 'mascots', loadChildren: './mascots/mascots.module#MascotsModule' },
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
  { path: 'rules', loadChildren: './rules/rules.module#RulesModule' },
  { path: 'policy', loadChildren: './policy/policy.module#PolicyModule' },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule'
  },
  {
    path: 'telegram',
    loadChildren: './telegram/telegram.module#TelegramModule'
  },
  {
    path: 'twins',
    loadChildren: './twins/twins.module#TwinsModule'
  },
  { path: 'top-view', loadChildren: './top-view/top-view.module#TopViewModule' },
  { path: 'upload', loadChildren: './upload/upload.module#UploadModule' },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
  { path: 'voting', loadChildren: './voting/voting.module#VotingModule' },
  { path: '', loadChildren: './index/index.module#IndexModule' },
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
