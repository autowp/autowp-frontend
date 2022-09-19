import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackSentComponent } from './sent/sent.component';
import { FeedbackComponent } from './feedback.component';

const routes: Routes = [
  { path: 'sent', component: FeedbackSentComponent, pathMatch: 'full', title: $localize `Message sent` },
  { path: '', component: FeedbackComponent, pathMatch: 'full', title: $localize `Feedback` }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
