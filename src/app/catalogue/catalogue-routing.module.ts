import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogueIndexComponent} from './index/index.component';
import {CatalogueRecentComponent} from './recent/recent.component';
import {CatalogueMixedComponent} from './mixed/mixed.component';
import {CatalogueOtherComponent} from './other/other.component';
import {CatalogueLogotypesComponent} from './logotypes/logotypes.component';
import {CatalogueConceptsComponent} from './concepts/concepts.component';
import {CatalogueMixedPictureComponent} from './mixed/picture/picture.component';
import {CatalogueOtherPictureComponent} from './other/picture/picture.component';
import {CatalogueLogotypesPictureComponent} from './logotypes/picture/picture.component';
import {CatalogueEnginesComponent} from './engines/engines.component';
import {CatalogueEnginesPicturesPictureComponent} from './engines/pictures/picture/picture.component';
import {CatalogueEnginesPicturesComponent} from './engines/pictures/pictures.component';
import {cataloguePathMatcher} from './matcher';
import {CatalogueEnginesGalleryComponent} from './engines/gallery/gallery.component';
import {CatalogueCarsComponent} from './cars/cars.component';

const routes: Routes = [
  {
    path: 'recent',
    component: CatalogueRecentComponent
  },
  {
    path: 'mixed',
    children: [
      {
        path: ':identity',
        component: CatalogueMixedPictureComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueMixedComponent,
      }
    ]
  },
  {
    path: 'other',
    children: [
      {
        path: ':identity',
        component: CatalogueOtherPictureComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueOtherComponent,
      }
    ]
  },
  {
    path: 'logotypes',
    children: [
      {
        path: ':identity',
        component: CatalogueLogotypesPictureComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueLogotypesComponent,
      }
    ]
  },
  {
    path: 'engines',
    children: [
      {
        matcher: cataloguePathMatcher,
        children: [
          {
            path: 'gallery',
            pathMatch: 'full',
            component: CatalogueEnginesGalleryComponent,
          },
          {
            path: 'pictures',
            children: [
              {
                path: ':identity',
                component: CatalogueEnginesPicturesPictureComponent,
              },
              {
                path: '',
                pathMatch: 'full',
                component: CatalogueEnginesPicturesComponent,
              }
            ]
          },
          {
            path: '',
            pathMatch: 'full',
            component: CatalogueEnginesComponent,
          }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueEnginesComponent,
      }
    ]
  },
  {
    path: 'concepts',
    component: CatalogueConceptsComponent
  },
  {
    path: 'cars',
    children: [
      {
        path: ':vehicle_type',
        component: CatalogueCarsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueCarsComponent,
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    component: CatalogueIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
