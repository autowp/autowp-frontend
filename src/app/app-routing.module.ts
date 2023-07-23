import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './not-found.component';

const appRoutes: Routes = [
  {loadChildren: () => import('./about/about.module').then((m) => m.AboutModule), path: 'about'},
  {
    loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
    path: 'account',
  },
  {
    loadChildren: () => import('./articles/articles.module').then((m) => m.ArticlesModule),
    path: 'articles',
  },
  {loadChildren: () => import('./brands/brands.module').then((m) => m.BrandsModule), path: 'brands'},
  {
    loadChildren: () => import('./cars/cars.module').then((m) => m.CarsModule),
    path: 'cars',
  },
  {
    loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule),
    path: 'category',
  },
  {loadChildren: () => import('./chart/chart.module').then((m) => m.ChartModule), path: 'chart'},
  {loadChildren: () => import('./cutaway/cutaway.module').then((m) => m.CutawayModule), path: 'cutaway'},
  {
    loadChildren: () => import('./donate/donate.module').then((m) => m.DonateModule),
    path: 'donate',
  },
  {
    loadChildren: () => import('./factories/factories.module').then((m) => m.FactoriesModule),
    path: 'factories',
  },
  {
    loadChildren: () => import('./feedback/feedback.module').then((m) => m.FeedbackModule),
    path: 'feedback',
  },
  {
    loadChildren: () => import('./forums/forums.module').then((m) => m.ForumsModule),
    path: 'forums',
  },
  {
    loadChildren: () => import('./inbox/inbox.module').then((m) => m.InboxModule),
    path: 'inbox',
  },
  {
    loadChildren: () => import('./info/info.module').then((m) => m.InfoModule),
    path: 'info',
  },
  {loadChildren: () => import('./log/log.module').then((m) => m.LogModule), path: 'log'},
  {loadChildren: () => import('./map/map.module').then((m) => m.MapModule), path: 'map'},
  {loadChildren: () => import('./mascots/mascots.module').then((m) => m.MascotsModule), path: 'mascots'},
  {
    loadChildren: () => import('./moder/moder.module').then((m) => m.ModerModule),
    path: 'moder',
  },
  {
    loadChildren: () => import('./mosts/mosts.module').then((m) => m.MostsModule),
    path: 'mosts',
  },
  {loadChildren: () => import('./museum/museum.module').then((m) => m.MuseumModule), path: 'museums'},
  {
    loadChildren: () => import('./new/new.module').then((m) => m.NewModule),
    path: 'new',
  },
  {
    loadChildren: () => import('./persons/persons.module').then((m) => m.PersonsModule),
    path: 'persons',
  },
  {
    loadChildren: () => import('./picture/picture.module').then((m) => m.PictureModule),
    path: 'picture',
  },
  {
    loadChildren: () => import('./gallery/gallery.module').then((m) => m.GalleryModule),
    path: 'gallery',
  },
  {loadChildren: () => import('./pulse/pulse.module').then((m) => m.PulseModule), path: 'pulse'},
  {loadChildren: () => import('./rules/rules.module').then((m) => m.RulesModule), path: 'rules'},
  {loadChildren: () => import('./policy/policy.module').then((m) => m.PolicyModule), path: 'policy'},
  {
    loadChildren: () => import('./telegram/telegram.module').then((m) => m.TelegramModule),
    path: 'telegram',
  },
  {
    loadChildren: () => import('./twins/twins.module').then((m) => m.TwinsModule),
    path: 'twins',
  },
  {loadChildren: () => import('./top-view/top-view.module').then((m) => m.TopViewModule), path: 'top-view'},
  {loadChildren: () => import('./upload/upload.module').then((m) => m.UploadModule), path: 'upload'},
  {
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
    path: 'users',
  },
  {loadChildren: () => import('./voting/voting.module').then((m) => m.VotingModule), path: 'voting'},
  {loadChildren: () => import('./index/index.module').then((m) => m.IndexModule), path: ''},
  {component: PageNotFoundComponent, path: 'error-404'},
  {component: LoginComponent, path: 'login'},
  {
    loadChildren: () => import('./catalogue/catalogue.module').then((m) => m.CatalogueModule),
    // matcher: cataloguePathMatcher,
    path: ':brand',
  },
  {path: '**', redirectTo: 'error-404'},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
})
export class AppRoutingModule {}
