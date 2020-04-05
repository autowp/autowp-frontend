import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotsRoutingModule } from './mascots-routing.module';
import { MascotsComponent } from './mascots.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [MascotsComponent],
  imports: [
    CommonModule,
    MascotsRoutingModule,
    PaginatorModule,
    ThumbnailModule,
    TranslateModule
  ]
})
export class MascotsModule {}
