import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { CommentsVotesComponent } from './votes/votes.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { CommentsListComponent } from './list/list.component';
import { CommentsFormComponent } from './form/form.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';
import { MomentModule } from 'ngx-moment';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { APICommentsModule } from '../api/comments/comments.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';

@NgModule({
  declarations: [
    CommentsComponent,
    CommentsListComponent,
    CommentsFormComponent,
    CommentsVotesComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    TranslateModule.forChild(),
    RouterModule.forChild([]),
    UserModule,
    NgbTooltipModule,
    NgbModalModule,
    MomentModule,
    FormsModule,
    UtilsModule,
    APICommentsModule,
    ThumbnailModule
  ],
  entryComponents: [CommentsVotesComponent],
  exports: [CommentsComponent]
})
export class CommentsModule {}
