import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {NgPipesModule} from 'ngx-pipes';

import {AreaComponent} from './area.component';
import {CarouselItemComponent} from './carousel-item.component';
import {GalleryComponent} from './gallery.component';
import {GalleryPageComponent} from './gallery-page.component';
import {GalleryRoutingModule} from './gallery-routing.module';

@NgModule({
  declarations: [GalleryComponent, CarouselItemComponent, AreaComponent, GalleryPageComponent],
  exports: [GalleryComponent],
  imports: [CommonModule, NgPipesModule, RouterModule, NgbTooltipModule, GalleryRoutingModule],
})
export class GalleryModule {}
