import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MostsRoutingModule} from './mosts-routing.module';
import {MostsComponent} from './mosts.component';
import {MostsService} from './mosts.service';
import {HttpClientModule} from '@angular/common/http';
import {UtilsModule} from '@utils/utils.module';
import {NgbTooltipModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {MostsContentsComponent} from './contents/contents.component';

@NgModule({
  exports: [MostsContentsComponent],
  declarations: [MostsComponent, MostsContentsComponent],
  imports: [CommonModule, MostsRoutingModule, HttpClientModule, UtilsModule, NgbTooltipModule, NgbDropdownModule],
  providers: [MostsService],
})
export class MostsModule {}
