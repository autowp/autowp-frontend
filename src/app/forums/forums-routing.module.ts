import {Routes} from '@angular/router';

import {ForumsComponent} from './forums.component';
import {MessageComponent} from './message/message.component';
import {ForumsMoveMessageComponent} from './move-message/move-message.component';
import {ForumsMoveTopicComponent} from './move-topic/move-topic.component';
import {ForumsNewTopicComponent} from './new-topic/new-topic.component';
import {ForumsSubscriptionsComponent} from './subscriptions/subscriptions.component';
import {ForumsTopicComponent} from './topic/topic.component';

export const routes: Routes = [
  {
    component: ForumsMoveMessageComponent,
    path: 'move-message',
    title: $localize`Move`,
  },
  {
    component: ForumsMoveTopicComponent,
    path: 'move-topic',
    title: $localize`Move`,
  },
  {
    component: ForumsNewTopicComponent,
    path: 'new-topic/:theme_id',
    title: $localize`New topic`,
  },
  {
    component: ForumsSubscriptionsComponent,
    path: 'subscriptions',
    title: $localize`Forums`,
  },
  {
    component: ForumsTopicComponent,
    path: 'topic/:topic_id',
    title: $localize`Forums`,
  },
  {
    component: MessageComponent,
    path: 'message/:message_id',
    title: $localize`Forums`,
  },
  {
    component: ForumsComponent,
    path: ':theme_id',
    title: $localize`Forums`,
  },
  {
    component: ForumsComponent,
    path: '',
    title: $localize`Forums`,
  },
];
