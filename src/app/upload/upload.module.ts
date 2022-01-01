import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadCropComponent } from './crop/crop.component';
import { UploadSelectComponent } from './select/select.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { FormsModule } from '@angular/forms';
import { UploadSelectTreeItemComponent } from './select/tree-item/tree-item.component';
import { UploadComponent } from './upload.component';
import { UtilsModule } from '../utils/utils.module';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import { NgbProgressbarModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UploadCropComponent,
    UploadSelectComponent,
    UploadSelectTreeItemComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    PaginatorModule,
    FormsModule,
    UtilsModule,
    NgbProgressbarModule,
    NgbModalModule,
    ThumbnailModule
  ]
})
export class UploadModule {}
