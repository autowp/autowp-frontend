import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryComponent } from './gallery.component';
import { CarouselItemComponent } from './carousel-item.component';
import { NgPipesModule } from 'ngx-pipes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GalleryComponent, CarouselItemComponent],
  imports: [
    CommonModule,
    NgPipesModule,
    RouterModule
  ],
  exports: [
    GalleryComponent
  ]
})
export class GalleryModule { }
