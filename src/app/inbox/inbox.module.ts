import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {InboxComponent} from './inbox.component';
import {InboxService} from './inbox.service';
import {InboxRoutingModule} from './inbox-routing.module';

@NgModule({
  declarations: [InboxComponent],
  imports: [CommonModule, InboxRoutingModule, FormsModule, ThumbnailModule, PaginatorModule],
  providers: [InboxService],
})
export class InboxModule {}
