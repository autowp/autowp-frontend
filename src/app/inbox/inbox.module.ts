import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { InboxService } from './inbox.service';

@NgModule({
  declarations: [InboxComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    TranslateModule,
    FormsModule,
    MomentModule,
    ThumbnailModule,
    PaginatorModule
  ],
  providers: [InboxService]
})
export class InboxModule {}
