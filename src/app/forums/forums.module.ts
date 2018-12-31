import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumsComponent } from './forums.component';
import { ForumsMoveMessageComponent } from './move-message/move-message.component';
import { ForumsMoveTopicComponent } from './move-topic/move-topic.component';
import { ForumsNewTopicComponent } from './new-topic/new-topic.component';
import { ForumsSubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ForumsTopicComponent } from './topic/topic.component';
import { MessageComponent } from './message/message.component';
import { ForumsService } from './forums.service';
import { HttpClientModule } from '@angular/common/http';
import { ForumsRoutingModule } from './forums-routing.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';
import { UserModule } from '../user/user.module';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule } from '@angular/forms';
import { CommentsModule } from '../comments/comments.module';

@NgModule({
  declarations: [
    ForumsComponent,
    ForumsMoveMessageComponent,
    ForumsMoveTopicComponent,
    ForumsNewTopicComponent,
    ForumsSubscriptionsComponent,
    ForumsTopicComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PaginatorModule,
    ForumsRoutingModule,
    TranslateModule.forChild(),
    MomentModule,
    UserModule,
    UtilsModule,
    FormsModule,
    CommentsModule
  ],
  providers: [ForumsService]
})
export class ForumsModule { }
