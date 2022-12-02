import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryComponent } from './gallery.component';
import { CarouselItemComponent } from './carousel-item.component';
import { NgPipesModule } from 'ngx-pipes/src/ng-pipes/ng-pipes.module';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AreaComponent } from './area.component';
import {GalleryPageComponent} from './gallery-page.component';
import {GalleryRoutingModule} from './gallery-routing.module';

@NgModule({
  declarations: [GalleryComponent, CarouselItemComponent, AreaComponent, GalleryPageComponent],
  imports: [
    CommonModule,
    NgPipesModule,
    RouterModule,
    NgbTooltipModule,
    GalleryRoutingModule
  ],
  exports: [
    GalleryComponent
  ]
})
export class GalleryModule { }
