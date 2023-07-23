import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModalModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {APICommentsModule} from '../api/comments/comments.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {UserModule} from '../user/user.module';
import {CommentsComponent} from './comments/comments.component';
import {CommentsFormComponent} from './form/form.component';
import {CommentsListComponent} from './list/list.component';
import {CommentsVotesComponent} from './votes/votes.component';

@NgModule({
  declarations: [CommentsComponent, CommentsListComponent, CommentsFormComponent, CommentsVotesComponent],
  exports: [CommentsComponent],
  imports: [
    CommonModule,
    PaginatorModule,
    RouterModule.forChild([]),
    UserModule,
    NgbTooltipModule,
    NgbModalModule,
    FormsModule,
    UtilsModule,
    APICommentsModule,
    ThumbnailModule,
  ],
})
export class CommentsModule {}
