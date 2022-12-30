import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ForumsComponent} from './forums.component';
import {MessageComponent} from './message/message.component';
import {ForumsTopicComponent} from './topic/topic.component';
import {ForumsSubscriptionsComponent} from './subscriptions/subscriptions.component';
import {ForumsNewTopicComponent} from './new-topic/new-topic.component';
import {ForumsMoveTopicComponent} from './move-topic/move-topic.component';
import {ForumsMoveMessageComponent} from './move-message/move-message.component';

const routes: Routes = [
  {
    path: 'move-message',
    component: ForumsMoveMessageComponent,
    title: $localize`Move`,
  },
  {
    path: 'move-topic',
    component: ForumsMoveTopicComponent,
    title: $localize`Move`,
  },
  {
    path: 'new-topic/:theme_id',
    component: ForumsNewTopicComponent,
    title: $localize`New topic`,
  },
  {
    path: 'subscriptions',
    component: ForumsSubscriptionsComponent,
    title: $localize`Forums`,
  },
  {
    path: 'topic/:topic_id',
    component: ForumsTopicComponent,
    title: $localize`Forums`,
  },
  {
    path: 'message/:message_id',
    component: MessageComponent,
    title: $localize`Forums`,
  },
  {
    path: ':theme_id',
    component: ForumsComponent,
    title: $localize`Forums`,
  },
  {
    path: '',
    component: ForumsComponent,
    title: $localize`Forums`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumsRoutingModule {}
