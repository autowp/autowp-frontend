import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryComponent } from './gallery.component';
import { CarouselItemComponent } from './carousel-item.component';
import { NgPipesModule } from 'ngx-pipes';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AreaComponent } from './area.component';

@NgModule({
  declarations: [GalleryComponent, CarouselItemComponent, AreaComponent],
  imports: [
    CommonModule,
    NgPipesModule,
    RouterModule,
    NgbTooltipModule
  ],
  exports: [
    GalleryComponent
  ]
})
export class GalleryModule { }
