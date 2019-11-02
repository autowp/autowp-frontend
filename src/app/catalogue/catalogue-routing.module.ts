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
import {cataloguePathMatcher} from './matcher';
import {CatalogueCarsComponent} from './cars/cars.component';
import {CatalogueVehiclesComponent} from './vehicles/vehicles.component';
import {CatalogueVehiclesPicturesPictureComponent} from './vehicles/pictures/picture/picture.component';
import {CatalogueVehiclesPicturesComponent} from './vehicles/pictures/pictures.component';
import {CatalogueVehiclesGalleryComponent} from './vehicles/gallery/gallery.component';
import {CatalogueVehiclesSpecificationsComponent} from './vehicles/specifications/specifications.component';

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
    component: CatalogueEnginesComponent
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
    matcher: cataloguePathMatcher,
    children: [
      {
        path: 'gallery/:identity',
        pathMatch: 'full',
        component: CatalogueVehiclesGalleryComponent,
      },
      {
        path: 'exact',
        data: {
          exact: true
        },
        children: [
          {
            path: 'pictures',
            children: [
              {
                path: ':identity',
                component: CatalogueVehiclesPicturesPictureComponent
              },
              {
                path: '',
                pathMatch: 'full',
                component: CatalogueVehiclesPicturesComponent,
              }
            ]
          },
        ]
      },
      {
        path: 'pictures',
        children: [
          {
            path: ':identity',
            component: CatalogueVehiclesPicturesPictureComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            component: CatalogueVehiclesPicturesComponent,
          }
        ]
      },
      {
        path: 'specifications',
        pathMatch: 'full',
        component: CatalogueVehiclesSpecificationsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueVehiclesComponent,
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
