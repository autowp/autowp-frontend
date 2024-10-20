import {Routes} from '@angular/router';

import {FeedbackComponent} from './feedback.component';
import {FeedbackSentComponent} from './sent/sent.component';

export const routes: Routes = [
  {component: FeedbackSentComponent, path: 'sent', pathMatch: 'full', title: $localize`Message sent`},
  {component: FeedbackComponent, path: '', pathMatch: 'full', title: $localize`Feedback`},
];
