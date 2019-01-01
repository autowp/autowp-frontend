import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MostsRoutingModule } from './mosts-routing.module';
import { MostsComponent } from './mosts.component';
import { MostsService } from './mosts.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule } from '../utils/utils.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MostsComponent],
  imports: [
    CommonModule,
    MostsRoutingModule,
    HttpClientModule,
    TranslateModule,
    UtilsModule,
    NgbTooltipModule
  ],
  providers: [MostsService]
})
export class MostsModule {}
