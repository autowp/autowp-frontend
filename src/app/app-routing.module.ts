import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import {CanActivateCatalogue} from './catalogue/can-activate';

const appRoutes: Routes = [
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)
  },
  { path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule) },
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  { path: 'chart', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'cutaway', loadChildren: () => import('./cutaway/cutaway.module').then(m => m.CutawayModule) },
  {
    path: 'donate',
    loadChildren: () => import('./donate/donate.module').then(m => m.DonateModule)
  },
  {
    path: 'factories',
    loadChildren: () => import('./factories/factories.module').then(m => m.FactoriesModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule)
  },
  {
    path: 'forums',
    loadChildren: () => import('./forums/forums.module').then(m => m.ForumsModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
  },
  { path: 'log', loadChildren: () => import('./log/log.module').then(m => m.LogModule) },
  { path: 'login', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) },
  { path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapModule) },
  { path: 'mascots', loadChildren: () => import('./mascots/mascots.module').then(m => m.MascotsModule) },
  {
    path: 'moder',
    loadChildren: () => import('./moder/moder.module').then(m => m.ModerModule)
  },
  {
    path: 'mosts',
    loadChildren: () => import('./mosts/mosts.module').then(m => m.MostsModule)
  },
  { path: 'museums', loadChildren: () => import('./museum/museum.module').then(m => m.MuseumModule) },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then(m => m.NewModule)
  },
  {
    path: 'persons',
    loadChildren: () => import('./persons/persons.module').then(m => m.PersonsModule)
  },
  { path: 'pulse', loadChildren: () => import('./pulse/pulse.module').then(m => m.PulseModule) },
  {
    path: 'restore-password',
    loadChildren:
      () => import('./restore-password/restore-password.module').then(m => m.RestorePasswordModule)
  },
  { path: 'rules', loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule) },
  { path: 'policy', loadChildren: () => import('./policy/policy.module').then(m => m.PolicyModule) },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'telegram',
    loadChildren: () => import('./telegram/telegram.module').then(m => m.TelegramModule)
  },
  {
    path: 'twins',
    loadChildren: () => import('./twins/twins.module').then(m => m.TwinsModule)
  },
  { path: 'top-view', loadChildren: () => import('./top-view/top-view.module').then(m => m.TopViewModule) },
  { path: 'upload', loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule) },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  { path: 'voting', loadChildren: () => import('./voting/voting.module').then(m => m.VotingModule) },
  { path: '', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },
  {
    // matcher: cataloguePathMatcher,
    path: ':brand',
    canActivate: [CanActivateCatalogue],
    loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule)
  },
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
