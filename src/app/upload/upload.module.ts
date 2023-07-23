import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModalModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {UploadCropComponent} from './crop/crop.component';
import {UploadIndexComponent} from './index/index.component';
import {UploadSelectComponent} from './select/select.component';
import {UploadSelectTreeItemComponent} from './select/tree-item/tree-item.component';
import {UploadComponent} from './upload.component';
import {UploadRoutingModule} from './upload-routing.module';

@NgModule({
  declarations: [
    UploadComponent,
    UploadCropComponent,
    UploadSelectComponent,
    UploadSelectTreeItemComponent,
    UploadIndexComponent,
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    PaginatorModule,
    FormsModule,
    UtilsModule,
    NgbProgressbarModule,
    NgbModalModule,
    ThumbnailModule,
  ],
})
export class UploadModule {}
