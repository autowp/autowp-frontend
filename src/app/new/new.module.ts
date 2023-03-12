import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewRoutingModule} from './new-routing.module';
import {NewComponent} from './new.component';
import {NewItemComponent} from './item/item.component';
import {NewListItemComponent} from './list-item/list-item.component';
import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {UtilsModule} from '@utils/utils.module';
import {MomentModule} from 'ngx-moment';

@NgModule({
  declarations: [NewComponent, NewItemComponent, NewListItemComponent],
  imports: [CommonModule, NewRoutingModule, PaginatorModule, ThumbnailModule, UtilsModule, MomentModule],
})
export class NewModule {}
