import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModalModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';

import {CommentsModule} from '../comments/comments.module';
import {UserModule} from '../user/user.module';
import {VotingVotesComponent} from './votes/votes.component';
import {VotingComponent} from './voting.component';
import {VotingService} from './voting.service';
import {VotingRoutingModule} from './voting-routing.module';

@NgModule({
  declarations: [VotingComponent, VotingVotesComponent],
  imports: [
    CommonModule,
    VotingRoutingModule,
    NgbProgressbarModule,
    NgbModalModule,
    FormsModule,
    CommentsModule,
    UserModule,
  ],
  providers: [VotingService],
})
export class VotingModule {}
