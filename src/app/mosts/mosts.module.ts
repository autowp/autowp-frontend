import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {MostsContentsComponent} from './contents/contents.component';
import {MostsComponent} from './mosts.component';
import {MostsService} from './mosts.service';
import {MostsRoutingModule} from './mosts-routing.module';

@NgModule({
  declarations: [MostsComponent, MostsContentsComponent],
  exports: [MostsContentsComponent],
  imports: [CommonModule, MostsRoutingModule, HttpClientModule, UtilsModule, NgbTooltipModule, NgbDropdownModule],
  providers: [MostsService],
})
export class MostsModule {}
