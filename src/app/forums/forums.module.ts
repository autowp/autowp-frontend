import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UtilsModule} from '@utils/utils.module';

import {CommentsModule} from '../comments/comments.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {UserModule} from '../user/user.module';
import {ForumsComponent} from './forums.component';
import {ForumsRoutingModule} from './forums-routing.module';
import {MessageComponent} from './message/message.component';
import {ForumsMoveMessageComponent} from './move-message/move-message.component';
import {ForumsMoveTopicComponent} from './move-topic/move-topic.component';
import {ForumsNewTopicComponent} from './new-topic/new-topic.component';
import {ForumsSubscriptionsComponent} from './subscriptions/subscriptions.component';
import {ForumsTopicComponent} from './topic/topic.component';
import {ForumsTopicListComponent} from './topic-list/topic-list.component';

export const MESSAGES_PER_PAGE = 20;

@NgModule({
  declarations: [
    ForumsComponent,
    ForumsMoveMessageComponent,
    ForumsMoveTopicComponent,
    ForumsNewTopicComponent,
    ForumsSubscriptionsComponent,
    ForumsTopicComponent,
    MessageComponent,
    ForumsTopicListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PaginatorModule,
    ForumsRoutingModule,
    UserModule,
    UtilsModule,
    FormsModule,
    CommentsModule,
  ],
})
export class ForumsModule {}
