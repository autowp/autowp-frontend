import {Routes} from '@angular/router';

import {CatalogueCarsComponent} from './cars/cars.component';
import {CatalogueConceptsComponent} from './concepts/concepts.component';
import {CatalogueEnginesComponent} from './engines/engines.component';
import {CatalogueIndexComponent} from './index/index.component';
import {cataloguePathMatcher} from './matcher';
import {CatalogueMixedGalleryComponent} from './mixed/gallery/gallery.component';
import {CatalogueMixedComponent} from './mixed/mixed.component';
import {CatalogueMixedPictureComponent} from './mixed/picture/picture.component';
import {CatalogueMostsComponent} from './mosts/mosts.component';
import {CatalogueRecentComponent} from './recent/recent.component';
import {CatalogueVehiclesGalleryComponent} from './vehicles/gallery/gallery.component';
import {CatalogueVehiclesPicturesPictureComponent} from './vehicles/pictures/picture/picture.component';
import {CatalogueVehiclesPicturesComponent} from './vehicles/pictures/pictures.component';
import {CatalogueVehiclesSpecificationsComponent} from './vehicles/specifications/specifications.component';
import {CatalogueVehiclesComponent} from './vehicles/vehicles.component';

export const routes: Routes = [
  {
    component: CatalogueRecentComponent,
    path: 'recent',
  },
  {
    children: [
      {
        component: CatalogueMixedGalleryComponent,
        path: 'gallery/:identity',
      },
      {
        component: CatalogueMixedPictureComponent,
        path: ':identity',
      },
      {
        component: CatalogueMixedComponent,
        path: '',
        pathMatch: 'full',
      },
    ],
    data: {
      catname: 'mixed',
      page_id: 40,
      perspective_id: 25,
      picture_page: {
        breadcrumbs: $localize`Miscellaneous`,
        id: 190,
      },
      title: $localize`Miscellaneous`,
    },
    path: 'mixed',
  },
  {
    children: [
      {
        component: CatalogueMixedGalleryComponent,
        path: 'gallery/:identity',
      },
      {
        component: CatalogueMixedPictureComponent,
        path: ':identity',
      },
      {
        component: CatalogueMixedComponent,
        path: '',
        pathMatch: 'full',
      },
    ],
    data: {
      catname: 'other',
      page_id: 41,
      perspective_exclude_id: '22,25',
      picture_page: {
        breadcrumbs: $localize`Unsorted`,
        id: 191,
      },
      title: $localize`Unsorted`,
    },
    path: 'other',
  },
  {
    children: [
      {
        component: CatalogueMixedGalleryComponent,
        path: 'gallery/:identity',
      },
      {
        component: CatalogueMixedPictureComponent,
        path: ':identity',
      },
      {
        component: CatalogueMixedComponent,
        path: '',
        pathMatch: 'full',
      },
    ],
    data: {
      catname: 'logotypes',
      page_id: 39,
      perspective_id: 22,
      picture_page: {
        breadcrumbs: $localize`Logotypes`,
        id: 192,
      },
      title: $localize`Logotypes`,
    },
    path: 'logotypes',
  },
  {
    component: CatalogueEnginesComponent,
    path: 'engines',
  },
  {
    component: CatalogueConceptsComponent,
    path: 'concepts',
  },
  {
    children: [
      {
        component: CatalogueCarsComponent,
        path: ':vehicle_type',
      },
      {
        component: CatalogueCarsComponent,
        path: '',
        pathMatch: 'full',
      },
    ],
    path: 'cars',
  },
  {
    children: [
      {
        component: CatalogueMostsComponent,
        path: '',
      },
      {
        component: CatalogueMostsComponent,
        path: ':rating_catname',
      },
      {
        component: CatalogueMostsComponent,
        path: ':rating_catname/:type_catname',
      },
      {
        component: CatalogueMostsComponent,
        path: ':rating_catname/:type_catname/:years_catname',
      },
    ],
    path: 'mosts',
  },
  {
    children: [
      {
        children: [
          {
            component: CatalogueVehiclesGalleryComponent,
            path: 'gallery/:identity',
          },
          {
            children: [
              {
                component: CatalogueVehiclesPicturesPictureComponent,
                path: ':identity',
              },
              {
                component: CatalogueVehiclesPicturesComponent,
                path: '',
                pathMatch: 'full',
              },
            ],
            path: 'pictures',
          },
        ],
        data: {
          exact: true,
        },
        path: 'exact',
      },
      {
        component: CatalogueVehiclesGalleryComponent,
        path: 'gallery/:identity',
        pathMatch: 'full',
      },
      {
        children: [
          {
            component: CatalogueVehiclesPicturesPictureComponent,
            path: ':identity',
          },
          {
            component: CatalogueVehiclesPicturesComponent,
            path: '',
            pathMatch: 'full',
          },
        ],
        path: 'pictures',
      },
      {
        component: CatalogueVehiclesSpecificationsComponent,
        path: 'specifications',
        pathMatch: 'full',
      },
      {
        component: CatalogueVehiclesComponent,
        path: '',
        pathMatch: 'full',
      },
    ],
    matcher: cataloguePathMatcher,
  },
  {
    component: CatalogueIndexComponent,
    path: '',
    pathMatch: 'full',
  },
];
