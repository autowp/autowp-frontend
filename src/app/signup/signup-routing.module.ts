import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupOkComponent } from './ok/ok.component';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  { path: 'ok', pathMatch: 'full', component: SignupOkComponent },
  { path: '', pathMatch: 'full', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
