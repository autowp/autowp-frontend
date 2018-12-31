import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumsComponent } from './forums.component';
import { MessageComponent } from './message/message.component';
import { ForumsTopicComponent } from './topic/topic.component';
import { ForumsSubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ForumsNewTopicComponent } from './new-topic/new-topic.component';
import { ForumsMoveTopicComponent } from './move-topic/move-topic.component';
import { ForumsMoveMessageComponent } from './move-message/move-message.component';

const routes: Routes = [
  {
    path: 'move-message',
    component: ForumsMoveMessageComponent
  },
  {
    path: 'move-topic',
    component: ForumsMoveTopicComponent
  },
  {
    path: 'new-topic/:theme_id',
    component: ForumsNewTopicComponent
  },
  {
    path: 'subscriptions',
    component: ForumsSubscriptionsComponent
  },
  {
    path: 'topic/:topic_id',
    component: ForumsTopicComponent
  },
  {
    path: 'message/:message_id',
    component: MessageComponent
  },
  {
    path: ':theme_id',
    component: ForumsComponent
  },
  {
    path: '',
    component: ForumsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumsRoutingModule {}
