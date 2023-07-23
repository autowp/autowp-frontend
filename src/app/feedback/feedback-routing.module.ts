import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FeedbackComponent} from './feedback.component';
import {FeedbackSentComponent} from './sent/sent.component';

const routes: Routes = [
  {component: FeedbackSentComponent, path: 'sent', pathMatch: 'full', title: $localize`Message sent`},
  {component: FeedbackComponent, path: '', pathMatch: 'full', title: $localize`Feedback`},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class FeedbackRoutingModule {}
