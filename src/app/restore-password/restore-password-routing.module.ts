import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestorePasswordComponent } from './restore-password.component';
import { RestorePasswordSentComponent } from './sent/sent.component';
import { RestorePasswordNewComponent } from './new/new.component';
import { RestorePasswordNewOkComponent } from './new/ok/ok.component';

const routes: Routes = [
  {
    path: 'new',
    children: [
      { path: 'ok', component: RestorePasswordNewOkComponent },
      { path: '', component: RestorePasswordNewComponent }
    ]
  },
  {
    path: 'sent',
    pathMatch: 'full',
    component: RestorePasswordSentComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: RestorePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestorePasswordRoutingModule {}
