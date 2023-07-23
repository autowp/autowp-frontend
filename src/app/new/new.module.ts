import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UtilsModule} from '@utils/utils.module';

import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {NewItemComponent} from './item/item.component';
import {NewListItemComponent} from './list-item/list-item.component';
import {NewComponent} from './new.component';
import {NewRoutingModule} from './new-routing.module';

@NgModule({
  declarations: [NewComponent, NewItemComponent, NewListItemComponent],
  imports: [CommonModule, NewRoutingModule, PaginatorModule, ThumbnailModule, UtilsModule],
})
export class NewModule {}
