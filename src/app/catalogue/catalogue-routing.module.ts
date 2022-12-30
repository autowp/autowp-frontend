import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CatalogueIndexComponent} from './index/index.component';
import {CatalogueRecentComponent} from './recent/recent.component';
import {CatalogueMixedComponent} from './mixed/mixed.component';
import {CatalogueConceptsComponent} from './concepts/concepts.component';
import {CatalogueMixedPictureComponent} from './mixed/picture/picture.component';
import {CatalogueEnginesComponent} from './engines/engines.component';
import {cataloguePathMatcher} from './matcher';
import {CatalogueCarsComponent} from './cars/cars.component';
import {CatalogueVehiclesComponent} from './vehicles/vehicles.component';
import {CatalogueVehiclesPicturesPictureComponent} from './vehicles/pictures/picture/picture.component';
import {CatalogueVehiclesPicturesComponent} from './vehicles/pictures/pictures.component';
import {CatalogueVehiclesGalleryComponent} from './vehicles/gallery/gallery.component';
import {CatalogueVehiclesSpecificationsComponent} from './vehicles/specifications/specifications.component';
import {CatalogueMostsComponent} from './mosts/mosts.component';
import {CatalogueMixedGalleryComponent} from './mixed/gallery/gallery.component';

const routes: Routes = [
  {
    path: 'recent',
    component: CatalogueRecentComponent,
  },
  {
    path: 'mixed',
    data: {
      catname: 'mixed',
      perspective_id: 25,
      page_id: 40,
      picture_page: {
        id: 190,
        breadcrumbs: $localize`Miscellaneous`,
      },
      title: $localize`Miscellaneous`,
    },
    children: [
      {
        path: 'gallery/:identity',
        component: CatalogueMixedGalleryComponent,
      },
      {
        path: ':identity',
        component: CatalogueMixedPictureComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueMixedComponent,
      },
    ],
  },
  {
    path: 'other',
    data: {
      catname: 'other',
      perspective_exclude_id: '22,25',
      page_id: 41,
      picture_page: {
        id: 191,
        breadcrumbs: $localize`Unsorted`,
      },
      title: $localize`Unsorted`,
    },
    children: [
      {
        path: 'gallery/:identity',
        component: CatalogueMixedGalleryComponent,
      },
      {
        path: ':identity',
        component: CatalogueMixedPictureComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueMixedComponent,
      },
    ],
  },
  {
    path: 'logotypes',
    data: {
      catname: 'logotypes',
      perspective_id: 22,
      page_id: 39,
      title: $localize`Logotypes`,
      picture_page: {
        id: 192,
        breadcrumbs: $localize`Logotypes`,
      },
    },
    children: [
      {
        path: 'gallery/:identity',
        component: CatalogueMixedGalleryComponent,
      },
      {
        path: ':identity',
        component: CatalogueMixedPictureComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueMixedComponent,
      },
    ],
  },
  {
    path: 'engines',
    component: CatalogueEnginesComponent,
  },
  {
    path: 'concepts',
    component: CatalogueConceptsComponent,
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
      },
    ],
  },
  {
    path: 'mosts',
    children: [
      {
        path: '',
        component: CatalogueMostsComponent,
      },
      {
        path: ':rating_catname',
        component: CatalogueMostsComponent,
      },
      {
        path: ':rating_catname/:type_catname',
        component: CatalogueMostsComponent,
      },
      {
        path: ':rating_catname/:type_catname/:years_catname',
        component: CatalogueMostsComponent,
      },
    ],
  },
  {
    matcher: cataloguePathMatcher,
    children: [
      {
        path: 'exact',
        data: {
          exact: true,
        },
        children: [
          {
            path: 'gallery/:identity',
            component: CatalogueVehiclesGalleryComponent,
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
              },
            ],
          },
        ],
      },
      {
        path: 'gallery/:identity',
        component: CatalogueVehiclesGalleryComponent,
        pathMatch: 'full',
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
          },
        ],
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
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    component: CatalogueIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogueRoutingModule {}
