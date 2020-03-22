import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsRoutingModule } from './items-routing.module';
import { ModerItemsAlphaComponent } from './alpha/alpha.component';
import { PaginatorModule } from '../../paginator/paginator.module';
import { ModerItemsItemOrganizeComponent } from './item/catalogue/organize/organize.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../../utils/utils.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModerItemsItemCatalogueComponent } from './item/catalogue/catalogue.component';
import { ModerItemsItemLinksComponent } from './item/links/links.component';
import { ModerItemsItemLogoComponent } from './item/logo/logo.component';
import { ModerItemsItemMetaComponent } from './item/meta/meta.component';
import { ModerItemsItemNameComponent } from './item/name/name.component';
import { MarkdownEditModule } from '../../markdown-edit/markdown-edit.module';
import { ModerItemsItemPicturesOrganizeComponent } from './item/pictures/organize/organize.component';
import { ModerItemsItemPicturesComponent } from './item/pictures/pictures.component';
import { ThumbnailModule } from '../../thumbnail/thumbnail.module';
import { ModerItemsItemSelectParentTreeComponent } from './item/select-parent/tree/tree.component';
import { ModerItemsItemSelectParentTreeItemComponent } from './item/select-parent/tree-item/tree-item.component';
import { ModerItemsItemSelectParentComponent } from './item/select-parent/select-parent.component';
import { ModerItemsItemTreeComponent } from './item/tree/tree.component';
import { ModerItemsItemVehiclesComponent } from './item/vehicles/vehicles.component';
import { ModerItemsItemComponent } from './item/item.component';
import { ModerItemsNewComponent } from './new/new.component';
import { ModerItemsTooBigComponent } from './too-big/too-big.component';
import { ItemMetaFormComponent } from './item-meta-form/item-meta-form.component';
import { ModerItemsComponent } from './items.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbTypeaheadModule, NgbModalModule, NgbProgressbarModule, NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ModerItemsAlphaComponent,
    ModerItemsItemOrganizeComponent,
    ModerItemsItemCatalogueComponent,
    ModerItemsItemLinksComponent,
    ModerItemsItemLogoComponent,
    ModerItemsItemMetaComponent,
    ModerItemsItemNameComponent,
    ModerItemsItemPicturesOrganizeComponent,
    ModerItemsItemPicturesComponent,
    ModerItemsItemSelectParentTreeComponent,
    ModerItemsItemSelectParentTreeItemComponent,
    ModerItemsItemSelectParentComponent,
    ModerItemsItemTreeComponent,
    ModerItemsItemVehiclesComponent,
    ModerItemsItemComponent,
    ModerItemsNewComponent,
    ModerItemsTooBigComponent,
    ItemMetaFormComponent,
    ModerItemsComponent
  ],
    imports: [
        CommonModule,
        ItemsRoutingModule,
        PaginatorModule,
        HttpClientModule,
        FormsModule,
        UtilsModule,
        TranslateModule,
        NgbTypeaheadModule,
        NgbModalModule,
        NgbProgressbarModule,
        NgbTabsetModule,
        MarkdownEditModule,
        ThumbnailModule,
        LeafletModule,
        NgbDropdownModule
    ]
})
export class ItemsModule {}
